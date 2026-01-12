export const upsertAtIndex = <T,>(arr: T[], index: number | null, item: T) => {
  const updated = [...arr];
  if (index !== null) updated[index] = item;
  else updated.push(item);
  return updated;
};

export const removeAtIndex = <T,>(arr: T[], index: number) => arr.filter((_, i) => i !== index);
