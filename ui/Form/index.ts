import FormInput from "./input";
import FormSelect from "./select";
import FormTimePickerRange from "./timePickerRange";

type IFormItem = {
  Input: typeof FormInput;
  Select: typeof FormSelect;
  TimePickerRange: typeof FormTimePickerRange;
};

const FormItem: IFormItem = {
  Input: FormInput,
  Select: FormSelect,
  TimePickerRange: FormTimePickerRange,
};

export { FormItem };
export * from "./form";
