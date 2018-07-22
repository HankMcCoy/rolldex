defmodule Rpgr.Auth.Pipeline do
  use Guardian.Plug.Pipeline,
    otp_app: :rpgr_de,
    error_handler: Rpgr.Auth.ErrorHandler,
    module: Rpgr.Auth.Guardian

  plug(Guardian.Plug.VerifySession, claims: %{"typ" => "access"})
  plug(Guardian.Plug.VerifyHeader, claims: %{"typ" => "access"})
  plug(Guardian.Plug.LoadResource, allow_blank: true)
end
