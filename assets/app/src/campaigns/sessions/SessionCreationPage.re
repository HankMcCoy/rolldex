open Util;

type state = {
  name: string,
  summary: string,
  notes: string,
};

type action =
  | ChangeName(string)
  | ChangeSummary(string)
  | ChangeNotes(string)
  | AddSession
  | AddSessionSuccess(SessionData.session);

let component = ReasonReact.reducerComponent("SessionCreationPage");

let buttonStyle =
  style(
    ~height="34px",
    ~display="flex",
    ~justifyContent="center",
    ~alignItems="center",
    ~borderRadius="3px",
    ~width="100px",
    ~fontSize="18px",
    ~padding="0",
    ~cursor="pointer",
    (),
  );

exception CannotAddSession;

/* greeting and children are props. `children` isn't used, therefore ignored.
   We ignore it by prepending it with an underscore */
let make = (~campaign: CampaignData.campaign, _children) => {
  ...component,
  initialState: () => {name: "", summary: "", notes: ""},
  reducer: (action, state) =>
    switch (action) {
    | ChangeName(name) => ReasonReact.Update({...state, name})
    | ChangeSummary(summary) => ReasonReact.Update({...state, summary})
    | ChangeNotes(notes) => ReasonReact.Update({...state, notes})
    | AddSession =>
      ReasonReact.SideEffects(
        (
          self => {
            Js.Promise.(
              SessionData.createSession({
                name: state.name,
                summary: state.summary,
                notes: state.notes,
                campaign_id: campaign.id,
              })
              |> then_(session =>
                   self.send(AddSessionSuccess(session)) |> resolve
                 )
              |> ignore
            );
            ();
          }
        ),
      )
    | AddSessionSuccess(addedSession) =>
      ReasonReact.SideEffects(
        (
          _self =>
            ReasonReact.Router.push(
              "/campaigns/"
              ++ string_of_int(addedSession.campaign_id)
              ++ "/sessions/"
              ++ string_of_int(addedSession.id),
            )
        ),
      )
    },
  render: ({send, state: {name, summary, notes}}) =>
    <div>
      <PageHeader
        title="Add session"
        breadcrumbs=[
          {text: "Campaigns", href: "/campaigns"},
          {
            text: campaign.name,
            href: "/campaigns/" ++ string_of_int(campaign.id),
          },
        ]
        background=Color.CampaignsPeriwinkle
      />
      <PageContent>
        <div style=(style(~maxWidth="400px", ()))>
          <div>
            <label>
              <Heading l=2> (s("Name")) </Heading>
              <Spacer height="15px" />
              <input
                style=(
                  style(
                    ~height="34px",
                    ~width="260px",
                    ~padding="0 10px",
                    ~fontSize="16px",
                    ~fontWeight="300",
                    ~fontFamily="Roboto",
                    (),
                  )
                )
                value=name
                onChange=(
                  event => send(ChangeName(getTarget(event)##value))
                )
              />
            </label>
          </div>
          <Spacer height="25px" />
          <div>
            <label>
              <Heading l=2> (s("Summary")) </Heading>
              <Spacer height="15px" />
              <textarea
                style=(
                  style(
                    ~minHeight="170px",
                    ~width="100%",
                    ~fontFamily="Roboto",
                    ~fontSize="16px",
                    ~fontWeight="300",
                    ~padding="10px",
                    (),
                  )
                )
                value=summary
                onChange=(
                  event => send(ChangeSummary(getTarget(event)##value))
                )
              />
            </label>
          </div>
          <Spacer height="25px" />
          <div>
            <label>
              <Heading l=2> (s("Notes")) </Heading>
              <Spacer height="15px" />
              <textarea
                style=(
                  style(
                    ~minHeight="170px",
                    ~width="100%",
                    ~fontFamily="Roboto",
                    ~fontSize="16px",
                    ~fontWeight="300",
                    ~padding="10px",
                    (),
                  )
                )
                value=notes
                onChange=(
                  event => send(ChangeNotes(getTarget(event)##value))
                )
              />
            </label>
          </div>
          <Spacer height="20px" />
          <div style=(style(~display="flex", ~justifyContent="flex-end", ()))>
            <Link
              href=("/campaigns/" ++ string_of_int(campaign.id))
              style=(
                combineStyles(
                  buttonStyle,
                  style(~background="#fff", ~border="1px solid #ddd", ()),
                )
              )>
              (s("Cancel"))
            </Link>
            <Spacer width="10px" />
            <button
              style=(
                combineStyles(
                  buttonStyle,
                  style(
                    ~border="none",
                    ~background="#3BA170",
                    ~color="#fff",
                    (),
                  ),
                )
              )
              onClick=(_event => send(AddSession))>
              (s("Create"))
            </button>
          </div>
        </div>
      </PageContent>
    </div>,
};
