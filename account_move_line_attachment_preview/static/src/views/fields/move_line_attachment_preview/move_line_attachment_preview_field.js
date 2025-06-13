import { _t } from "@web/core/l10n/translation";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { url } from "@web/core/utils/urls";
import { standardFieldProps } from "@web/views/fields/standard_field_props"; //"../standard_field_props";

import { Component, onWillUpdateProps, useState } from "@odoo/owl";

  /* 
    there is a way to get filename and ir.attachment id: 
    var attachment_id = this.props.record.data.preview_attachment_id[0];
    const filename = this.props.record.data.preview_attachment_id[1];
    console.log(`attachment_id: ${attachment_id}, filename: ${filename}`)
  */

export class PdfPreviewField extends Component {
  static template = "move_line_attachment_preview.PdfPreviewField";
  static components = {};
  static props = {
    ...standardFieldProps,
  };



  setup() {
    /* 
    delet this? 
    */
    console.log("PdfPreviewField.setup")
    // console.log(`this.props.id: ${this.props.id}, this.props.name: ${this.props.name}, this.props.record.data.id: ${this.props.record.data.id}`)
    // this.props.name is the name of the field...
    // console.log(`this.props.record.data.id: ${this.props.record.data.id}`)
    // console.log(`this.props.record.data.preview_attachment_id_id: ${this.props.record.data.preview_attachment_id_id}`)
    // console.log(`this.props.record.data.main_attachment_mimetype: ${this.props.record.data.main_attachment_mimetype}`)
    // if (this.props.record.data.main_attachment_mimetype === 'application/pdf') {
    //   console.log("IT'S A PDF!")
    // }
    // this.notification = useService("notification");
    // this.state = useState({
    //   isValid: true,
    //   objectUrl: "",
    // });
    // onWillUpdateProps((nextProps) => {
    //   if (nextProps.readonly) {
    //     this.state.objectUrl = "";
    //   }
    // });
  }

  get preview_url() {
    /* 
    return url for built-in pdf viewer if pdf, else return direct link
    */
    if (/* filetype is pdf */this.props.record.data.main_attachment_mimetype === 'application/pdf') {
      console.log(`It's a PDF! returning url for viewer`)
      const file = encodeURIComponent(
        url("/web/content", {
          model: "ir.attachment",
          field: "raw",
          id: this.props.record.data[this.props.name]
        })
      )
      if (file) { console.log(`file: ${file}`) }
      return `/web/static/lib/pdfjs/web/viewer.html?file=${file}`;
    } else {
      console.log("Not a PDF! returning url for file")
      const direct_link = url("/web/content", {
        model: "ir.attachment",
        field: "raw",
        id: this.props.record.data[this.props.name]
      })
      return direct_link;
    }
  }

  get file_url() {
    /* just the file url please */
    const direct_link = url("/web/content", {
      model: "ir.attachment",
      field: "raw",
      id: this.props.record.data[this.props.name]
    })
    return direct_link
  }

  // onClick() {
  //   console.log(`ONCLICK CLICKED`)
  //   // open attachment in side bar thing
  // }

  onLoadFailed() {
    console.log("PdfPreviewField.onLoadFailed")
    // this.state.isValid = false;
    // this.notification.add(_t("Could not display the selected pdf"), {
    //   type: "danger",
    // });
  }
}

export const pdfPreviewField = {
  component: PdfPreviewField,
};

registry.category("fields").add("move_line_attachment_preview_widget", pdfPreviewField);
