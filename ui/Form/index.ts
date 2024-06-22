import FormInput from "./input";
import FormSelect from "./select";
import FormTimePickerRange from "./timePickerRange";
import FormCheckbox from "./checkbox";
import FormCheckboxGroup from "./checkboxGroup";
import FormSwitch from "./switch";
import FormTextarea from "./textarea";
import FormTimePicker from "./timePicker";

type IFormItem = {
  Input: typeof FormInput;
  Select: typeof FormSelect;
  TimePickerRange: typeof FormTimePickerRange;
  Checkbox: typeof FormCheckbox;
  CheckboxGroup: typeof FormCheckboxGroup;
  Switch: typeof FormSwitch;
  Textarea: typeof FormTextarea;
  TimePicker: typeof FormTimePicker;
};

const FormItem: IFormItem = {
  Input: FormInput,
  Select: FormSelect,
  TimePickerRange: FormTimePickerRange,
  Checkbox: FormCheckbox,
  CheckboxGroup: FormCheckboxGroup,
  Switch: FormSwitch,
  Textarea: FormTextarea,
  TimePicker: FormTimePicker,
};

export { FormItem };
export * from "./form";
