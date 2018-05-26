open Util;

let component = ReasonReact.statelessComponent("PageHeader");

type breadcrumb = {
  text: string,
  href: string,
};

type breadcrumbs = list(breadcrumb);

module Breadcrumb = {
  let component = ReasonReact.statelessComponent("PageHeaderBreadcrumb");
  let divider = <div style=(style(~padding="0 3px", ()))> (s(">")) </div>;
  let make = (~text, ~href, _children) => {
    ...component,
    render: _self =>
      <Link href style=(style(~color="#fff", ~textDecoration="none", ()))>
        (s(text))
      </Link>,
  };
};

module BreadcrumbDivider = {
  let component =
    ReasonReact.statelessComponent("PageHeaderBreadcrumbDivider");
  let make = _children => {
    ...component,
    render: _self =>
      <div style=(style(~padding="0 3px", ()))> (s(">")) </div>,
  };
};

module BreadcrumbList = {
  let component = ReasonReact.statelessComponent("PageHeaderBreadcrumbList");
  let make = children => {
    ...component,
    render: _self =>
      ReasonReact.createDomElement(
        "div",
        ~props={
          "style":
            style(
              ~display="flex",
              ~color="#fff",
              ~height="23px",
              ~lineHeight="26px",
              ~opacity="0.85",
              ~fontSize="14px",
              (),
            ),
        },
        children,
      ),
  };
};

let make =
    (~breadcrumbs: breadcrumbs, ~title, ~background: Color.color, children) => {
  ...component,
  render: _self =>
    <div
      style=(
        style(
          ~display="flex",
          ~justifyContent="space-between",
          ~alignItems="center",
          ~background=Color.getHex(background),
          ~height="80px",
          (),
        )
      )>
      <div style=(style(~padding="5px 10px 15px 30px", ()))>
        (
          List.length(breadcrumbs) > 0 ?
            <BreadcrumbList>
              (
                breadcrumbs
                |> List.mapi((idx, b) => {
                     let crumb =
                       <Breadcrumb
                         text=b.text
                         href=b.href
                         key=(string_of_int(idx))
                       />;
                     idx === List.length(breadcrumbs) - 1 ?
                       [crumb] :
                       [
                         crumb,
                         <BreadcrumbDivider
                           key=(string_of_int(idx) ++ "_divider")
                         />,
                       ];
                   })
                |> List.flatten
                |> Array.of_list
                |> ReasonReact.array
              )
            </BreadcrumbList> :
            <BreadcrumbList>
              <Breadcrumb text="Home" href="/" />
            </BreadcrumbList>
        )
        <div style=(style(~fontFamily="Roboto Slab", ~color="#fff", ()))>
          <Heading l=1> (s(title)) </Heading>
        </div>
      </div>
      (
        ReasonReact.createDomElement(
          "div",
          ~props={"style": style(~padding="0 30px 0 10px", ())},
          children,
        )
      )
    </div>,
};
