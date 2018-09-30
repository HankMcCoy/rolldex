defmodule RpgrWeb.CampaignMemberView do
  use RpgrWeb, :view
  alias RpgrWeb.CampaignMemberView

  def render("index.json", %{members: members}) do
    %{data: render_many(members, CampaignMemberView, "member.json")}
  end

  def render("show.json", %{member: member}) do
    %{data: render_one(member, CampaignMemberView, "member.json")}
  end

  def render("member.json", %{member: member}) do
    %{
      user_id: member.user_id,
      campaign_id: member.campaign_id,
      member_type: member.member_type
    }
  end
end
