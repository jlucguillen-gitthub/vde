import CollectionCheckboxRenderer from "./renderers.jsx/CollectionCheckboxRenderer";
import DateRenderer from "./renderers.jsx/DateRenderer";
import HiddenRenderer from "./renderers.jsx/HiddenRenderer";
import NumberRenderer from "./renderers.jsx/NumberRenderer";
import SelectRenderer from "./renderers.jsx/SelectRenderer";
import TextRenderer from "./renderers.jsx/TextRenderer";

export const FieldRenderers = {

    text: TextRenderer,
    date: DateRenderer,
    number: NumberRenderer,
    select:SelectRenderer,
    collectionCheckbox:CollectionCheckboxRenderer,
    hidden:HiddenRenderer
};