import { registry } from "@web/core/registry";
import { listView } from "@web/views/list/list_view";
import { ListController } from "@web/views/list/list_controller";
import { SIZES } from "@web/core/ui/ui_service";
import {  useState, useRef } from "@odoo/owl";

export class AccountMoveLineListController extends ListController {
  static template = "move_line_attachment_preview.MoveLineListView";
  static components = {
    ...ListController.components,
  };

  setup() {
    console.log("AccountMoveLineListController setup")
    super.setup();
    this.iFrameRef = useRef('iframe')
    this.iFrameEnabled = useState({ active: false })
  }

  onIFrameLoaded() {
    console.log("iframe loaded")
    // this.iFrameRef.removeClass("")
    // this.iFrameRef.addClass("attachment_preview_iframe")
    this.iFrameEnabled.active = true
  } 
}


export const AccountMoveLineListView = {
  ...listView,
  Controller: AccountMoveLineListController,
};

registry.category("views").add("move_line_attachment_preview_list", AccountMoveLineListView);