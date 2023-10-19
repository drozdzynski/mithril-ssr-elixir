defmodule MithrilWeb.PageHTML do
  use MithrilWeb, :html

  def mithril(component_path) do
    {:ok, html} = NodeJS.call("renderer/index.js", [component_path])
    assigns = %{
      html: {:safe, html},
    }

    ~H"""
      <div class="mithril-123">
        <%= @html %>
      </div>
      <script type="module">
        import component, { mount } from "/assets/web/<%= component_path %>.js"

        mount(document.querySelector('.mithril-123'), component)
      </script>
    """
  end

  embed_templates "page_html/*"
end
