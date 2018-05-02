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
      <a href style=(style(~color="#fff", ~textDecoration="none", ()))>
        (s(text))
      </a>,
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
    (~breadcrumbs: breadcrumbs, ~title, ~background: Color.color, _children) => {
  ...component,
  render: _self =>
    <div
      style=(
        style(
          ~background=Color.getHex(background),
          ~height="80px",
          ~padding="5px 30px 15px 30px",
          (),
        )
      )>
      (
        List.length(breadcrumbs) > 0 ?
          <BreadcrumbList>
            (
              breadcrumbs
              |> List.mapi((idx, b) =>
                   idx === List.length(breadcrumbs) - 1 ?
                     [<Breadcrumb text=b.text href=b.href />] :
                     [
                       <Breadcrumb text=b.text href=b.href />,
                       Breadcrumb.divider,
                     ]
                 )
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
    </div>,
};
