export function getFormFields<T extends string[]>(
  elements: HTMLFormControlsCollection,
  fields: T,
) {
  const asObj: Record<string, string> = {};

  for (const field of fields) {
    if (!(field in elements)) {
      throw new Error(`Field ${field} not found in form`);
    }

    const formElements = elements as unknown as Record<
      string,
      { value: string; type: string; checked?: boolean }
    >;
    const isCheckbox = formElements[field].type === "checkbox";

    asObj[field] = isCheckbox
      ? formElements[field].checked?.toString() ?? "false"
      : formElements[field].value;
  }

  return asObj as Record<T[number], string>;
}
