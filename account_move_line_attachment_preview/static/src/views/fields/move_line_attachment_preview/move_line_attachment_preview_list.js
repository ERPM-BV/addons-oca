import { registry } from "@web/core/registry";
import { listView } from "@web/views/list/list_view";
import { ListRenderer } from "@web/views/list/list_renderer";
import { ListController } from "@web/views/list/list_controller";
import { SIZES } from "@web/core/ui/ui_service";
import { url } from "@web/core/utils/urls";
import { useState, useRef } from "@odoo/owl";

export class AccountMoveLineListController extends ListController {
  static template = "move_line_attachment_preview.MoveLineListView";
  static components = {
    ...ListController.components,
  };

  setup() {
    console.log("AccountMoveLineListController setup")
    super.setup();
    this.iFrameRef = useRef('iframe')
    this.iFrameState = useState({ active: false, src: 'about:blank' })
  }

  onIFrameLoaded() {
    console.log("onIFrameLoaded")
    this.iFrameState.active = true
  }
}

export class AccountMoveLineListRenderer extends ListRenderer {
  static props = [...ListRenderer.props];
  setup() {
    super.setup()
    this.iFrameRef = useRef('iframe')
  }

  onCellClicked(record, column, ev) {
    super.onCellClicked(record, column, ev);
    console.log(`record.data.preview_attachment_id: ${record.data.preview_attachment_id}`)
    console.log(`link: ${this.getFileUrl(record.data.preview_attachment_id)}`)

    /* if attachment, change iframe src to link */
  
    // this.iFrameRef.el.src = this.getFileUrl(record.data.preview_attachment_id) /* why doesn't this work, is my iFrameRef broken? */
  }

  getFileUrl(id) {
    /* if not id, then ??? */
    const direct_link = url("/web/content", {
      model: "ir.attachment",
      field: "raw",
      id: id
    })
    return direct_link
  }
  
}

export const AccountMoveLineListView = {
  ...listView,
  Controller: AccountMoveLineListController,
  Renderer: AccountMoveLineListRenderer,
};

registry.category("views").add("move_line_attachment_preview_list", AccountMoveLineListView);