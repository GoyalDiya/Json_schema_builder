import React from "react";
import { useFormContext, useWatch } from "react-hook-form";

function buildJson(fields) {
  if (!fields) return {};
  const obj = {};
  fields.forEach((f) => {
    if (!f.key) return;
    if (f.type === "string") obj[f.key] = "string";
    else if (f.type === "number") obj[f.key] = 0;
    else if (f.type === "nested") obj[f.key] = buildJson(f.fields);
  });
  return obj;
}
function JsonPreview() {
  const { control } = useFormContext();
  const fields = useWatch({ control, name: "fields" });
  const json = buildJson(fields);

  return (
    <div>
      <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">
        {JSON.stringify(json, null, 2)}
      </pre>
    </div>
  );
}

export default JsonPreview;