import { Alert, Avatar, Checkbox, Radio, Switch, Field, Tabs, Input, Combobox } from "../index.js";

export const composition = (
  <Alert.Root>
    <Alert.Title>Saved</Alert.Title>
  </Alert.Root>
);
export const fieldDescription = <Field.Description>Use your work email.</Field.Description>;
export const tab = <Tabs.Tab value="overview">Overview</Tabs.Tab>;

// @ts-expect-error Headings are composed with Alert.Title.
export const titleProp = <Alert.Root title="Saved" />;
// @ts-expect-error Icons are composed with Alert.Icon.
export const iconProp = <Alert.Root icon={<span />} />;
// @ts-expect-error Dismissal belongs to Alert.Close.
export const closeProp = <Alert.Root onClose={() => {}} />;
// Callable for the common case: content props compose the parts for you.
export const callableAlert = <Alert title="Saved" onClose={() => {}} />;
export const callableAvatar = <Avatar name="Ada Lovelace" />;
export const callableSwitch = <Switch label="Order updates" />;

export const avatar = (
  <Avatar.Root role="img" aria-label="Ada Lovelace">
    <Avatar.Image src="/ada.png" alt="" />
    <Avatar.Fallback>AL</Avatar.Fallback>
  </Avatar.Root>
);
// @ts-expect-error Image sources belong to Avatar.Image.
export const avatarSource = <Avatar.Root src="/ada.png" />;
// @ts-expect-error Fallback content is supplied as children.
export const avatarName = <Avatar.Root name="Ada Lovelace" />;
// @ts-expect-error Overflow is an explicitly composed avatar.
export const avatarOverflow = <Avatar.Group more={5} />;

// Content props: the label and its description are what a checkbox is for,
// so they compose the labelled row rather than being configuration.
export const checkboxLabel = <Checkbox label="Accept" />;
export const radioDescription = <Radio description="Choose one" />;
// @ts-expect-error Checked state belongs to the native Switch.Control.
export const switchDefault = <Switch.Root defaultChecked />;

// Adornments are content, not configuration: a currency symbol belongs in
// the box, and the box is the wrapper Input, Textarea and Select all render.
export const inputPrefix = <Input startSection="£" />;
export const inputSuffix = <Input endSection="GBP" />;
export const inputWrapper = <Input wrapperProps={{}} />;
// Combobox.Input renders the library's Input, so it takes the same wrapper.
export const comboboxWrapper = <Combobox.Input wrapperProps={{}} />;
