import React from "react";
import { useFieldArray, useFormContext, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";


const FIELD_TYPES = [
  { value: "string", label: "string" },
  { value: "number", label: "number" },
  { value: "nested", label: "nested" },
];

function FieldRow({ nestLevel, namePrefix }) {
  const { control, register, setValue, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: namePrefix,
  });

  const values = watch(namePrefix);

  return (
    <div className="space-y-2">
      {fields.map((field, idx) => {
        const fieldName = `${namePrefix}[${idx}]`;
        const type = values?.[idx]?.type || "string";
        
        if (type === "nested") {
          return (
            <div key={field.id} className={`ml-8 border-l-2 border-gray-200 pl-4 w-full space-y-2`}>
              <div className="flex items-center gap-2">

                <Input
                  {...register(`${fieldName}.key`)}
                  placeholder="Field name"
                  className="w-32"
                />

                <Controller
                  control={control}
                  name={`${fieldName}.type`}
                  render={({ field: selectField }) => (
                    <Select
                      value={selectField.value}
                      onValueChange={(val) => {
                        selectField.onChange(val);
                        if (val === "nested") setValue(`${fieldName}.fields`, []);
                      }}
                    >
                      <SelectTrigger
                        className="w-32 border border-gray-500 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition placeholder:text-gray-500"
                      >
                        {selectField.value ? selectField.value : "Field Type"}
                      </SelectTrigger>
                      <SelectContent>
                        {FIELD_TYPES.map((t) => (
                          <SelectItem key={t.value} value={t.value}>
                            {t.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
                  <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5"></div>
                </label>
               
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(idx)}
                  className="text-xl text-black hover:text-black"
                >
                  ×
                </Button>
              </div>
            
              <FieldRow
                nestLevel={nestLevel + 1}
                namePrefix={`${fieldName}.fields`}
              />
              <Button
                type="button"
                onClick={() => setValue(`${fieldName}.fields`, [...(values?.[idx]?.fields || []), { key: '', type: '' }])}
                className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-md py-3"
              >
                + Add Item
              </Button>
            </div>
          );
        }
       
        return (
          <div
            key={field.id}
            className={`flex items-center gap-2 ${nestLevel > 0 ? "ml-8 border-l-2 border-gray-200 pl-4" : ""}`}
          >
            
            <Input
              {...register(`${fieldName}.key`)}
              placeholder="Field name"
              className="w-32"
            />
            
            <Controller
              control={control}
              name={`${fieldName}.type`}
              render={({ field: selectField }) => (
                <Select
                  value={selectField.value}
                  onValueChange={(val) => {
                    selectField.onChange(val);
                    if (val === "nested") setValue(`${fieldName}.fields`, []);
                  }}
                >
                  <SelectTrigger
                    className="w-32 border border-gray-500 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition placeholder:text-gray-500"
                  >
                    {selectField.value ? selectField.value : "Field Type"}
                  </SelectTrigger>
                  <SelectContent>
                    {FIELD_TYPES.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
              <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5"></div>
            </label>
          
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => remove(idx)}
              className="text-xl text-black hover:text-black"
            >
              ×
            </Button>
          </div>
        );
      })}
      {nestLevel === 0 && (
        <Button
          type="button"
          onClick={() => append({ key: "", type: "" })}
          className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-md py-3"
        >
          + Add Item
        </Button>
      )}
    </div>
  );
}

export default FieldRow;