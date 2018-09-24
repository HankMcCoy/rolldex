use Mix.Releases.Config,
    # This sets the default release built by `mix release`
    default_release: :default,
    # This sets the default environment used by `mix release`
    default_environment: :dev

# For a full list of config options for both releases
# and environments, visit https://hexdocs.pm/distillery/configuration.html


# You may define one or more environments in this file,
# an environment's settings will override those of a release
# when building in that environment, this combination of release
# and environment configuration is called a profile

environment :dev do
  set dev_mode: true
  set include_erts: false
  set cookie: :"?y,/0GSYc7sG|ivo@4yRRQG.!PXxS,^$;Lb=qf>MRr*o8.yS;W,Gt=ACNp)XJ0He"
end

environment :prod do
  set include_erts: true
  set include_src: false
  set cookie: :"ifUJ[v$c6buzH$at1UmV_4._R(HAgjXqxg=TBQ3(L<9`y.MkqVI|b<859Tl/|[9*"
end

# You may define one or more releases in this file.
# If you have not set a default release, or selected one
# when running `mix release`, the first release in the file
# will be used by default

release :rpgr do
  set version: current_version(:rpgr)
end

