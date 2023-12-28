import { Input } from "./ui/input";

export default function EditTask({ inputRef, editableText, handleTextChange, handleBlur, className }) {
  return (
    <Input
      ref={inputRef}
      type='text'
      value={editableText}
      onChange={handleTextChange}
      onBlur={handleBlur}
      className={className}
    />
  )
}