import FormInput from "./input";
import FormSelect from "./select";
import FormTimePickerRange from "./timePickerRange";
import FormCheckbox from "./checkbox";
import FormCheckboxGroup from "./checkboxGroup";
import FormSwitch from "./switch";

type IFormItem = {
  Input: typeof FormInput;
  Select: typeof FormSelect;
  TimePickerRange: typeof FormTimePickerRange;
  Checkbox: typeof FormCheckbox;
  CheckboxGroup: typeof FormCheckboxGroup;
  Switch: typeof FormSwitch;
};

const FormItem: IFormItem = {
  Input: FormInput,
  Select: FormSelect,
  TimePickerRange: FormTimePickerRange,
  Checkbox: FormCheckbox,
  CheckboxGroup: FormCheckboxGroup,
  Switch: FormSwitch,
};

export { FormItem };
export * from "./form";
