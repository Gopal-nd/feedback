import ReactDom from "react-dom/client";
import Widget  from "./components/Widget";

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
    const root = ReactDom.createRoot(this.shadowRoot as ShadowRoot);
    root.render(<Widget {...props} />);
  }

  getPropsFromAttributes() {
    const props : Record<string, any> = {};
    for (const attr of this.attributes) {
      props[normalizeAttribute(attr.name)] = attr.value;
    }
    return props;
  }
}

export default WidgetWebComponent;