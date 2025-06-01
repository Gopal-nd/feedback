import ReactDom from "react-dom/client";
import Widget  from "./components/Widget";

// Input: "user-name"
// Output: "userName"
export const normalizeAttribute = (attribute:string) => {
  return attribute.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
};


class WidgetWebComponent extends HTMLElement {
     static observedAttributes = [];
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const props = this.getPropsFromAttributes();
    const root = ReactDom.createRoot(this.shadowRoot as ShadowRoot); // eg. id='root'
    root.render(<Widget {...props} />);
  }

  // input : <widget-web-component user-name="JohnDoe" data-id="123" />
  // output :<Widget userName="JohnDoe" dataId="123" />

  getPropsFromAttributes() {
    const props : Record<string, any> = {};
    for (const attr of this.attributes) {
      props[normalizeAttribute(attr.name)] = attr.value;
    }
    return props;
  }
}

export default WidgetWebComponent;