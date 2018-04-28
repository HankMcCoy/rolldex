defmodule Rpgr.SystemContextTest do
  use Rpgr.DataCase

  alias Rpgr.SystemContext

  describe "systems" do
    alias Rpgr.SystemContext.System

    @valid_attrs %{name: "some name"}
    @update_attrs %{name: "some updated name"}
    @invalid_attrs %{name: nil}

    def system_fixture(attrs \\ %{}) do
      {:ok, system} =
        attrs
        |> Enum.into(@valid_attrs)
        |> SystemContext.create_system()

      system
    end

    test "list_systems/0 returns all systems" do
      system = system_fixture()
      assert SystemContext.list_systems() == [system]
    end

    test "get_system!/1 returns the system with given id" do
      system = system_fixture()
      assert SystemContext.get_system!(system.id) == system
    end

    test "create_system/1 with valid data creates a system" do
      assert {:ok, %System{} = system} = SystemContext.create_system(@valid_attrs)
      assert system.name == "some name"
    end

    test "create_system/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = SystemContext.create_system(@invalid_attrs)
    end

    test "update_system/2 with valid data updates the system" do
      system = system_fixture()
      assert {:ok, system} = SystemContext.update_system(system, @update_attrs)
      assert %System{} = system
      assert system.name == "some updated name"
    end

    test "update_system/2 with invalid data returns error changeset" do
      system = system_fixture()
      assert {:error, %Ecto.Changeset{}} = SystemContext.update_system(system, @invalid_attrs)
      assert system == SystemContext.get_system!(system.id)
    end

    test "delete_system/1 deletes the system" do
      system = system_fixture()
      assert {:ok, %System{}} = SystemContext.delete_system(system)
      assert_raise Ecto.NoResultsError, fn -> SystemContext.get_system!(system.id) end
    end

    test "change_system/1 returns a system changeset" do
      system = system_fixture()
      assert %Ecto.Changeset{} = SystemContext.change_system(system)
    end
  end

  describe "systems" do
    alias Rpgr.SystemContext.System

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def system_fixture(attrs \\ %{}) do
      {:ok, system} =
        attrs
        |> Enum.into(@valid_attrs)
        |> SystemContext.create_system()

      system
    end

    test "list_systems/0 returns all systems" do
      system = system_fixture()
      assert SystemContext.list_systems() == [system]
    end

    test "get_system!/1 returns the system with given id" do
      system = system_fixture()
      assert SystemContext.get_system!(system.id) == system
    end

    test "create_system/1 with valid data creates a system" do
      assert {:ok, %System{} = system} = SystemContext.create_system(@valid_attrs)
    end

    test "create_system/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = SystemContext.create_system(@invalid_attrs)
    end

    test "update_system/2 with valid data updates the system" do
      system = system_fixture()
      assert {:ok, system} = SystemContext.update_system(system, @update_attrs)
      assert %System{} = system
    end

    test "update_system/2 with invalid data returns error changeset" do
      system = system_fixture()
      assert {:error, %Ecto.Changeset{}} = SystemContext.update_system(system, @invalid_attrs)
      assert system == SystemContext.get_system!(system.id)
    end

    test "delete_system/1 deletes the system" do
      system = system_fixture()
      assert {:ok, %System{}} = SystemContext.delete_system(system)
      assert_raise Ecto.NoResultsError, fn -> SystemContext.get_system!(system.id) end
    end

    test "change_system/1 returns a system changeset" do
      system = system_fixture()
      assert %Ecto.Changeset{} = SystemContext.change_system(system)
    end
  end
end
