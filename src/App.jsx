import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import FieldRow from "./components/FieldRow";
import JsonPreview from "./components/JsonPreview";

function App() {
  const methods = useForm({
    defaultValues: {
      fields: [],
    },
  });

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
        {/* Form Builder */}
        <div className=" flex flex-col p-8">
          
          <form
            onSubmit={methods.handleSubmit((data) => {
              
            })}
            className="flex flex-col gap-4"
          >
            <FieldRow nestLevel={0} namePrefix="fields" />
            <button
              type="submit"
              className="w-24 mt-4 py-1 rounded border bg-white hover:bg-gray-100 text-gray-800"
            >
              Submit
            </button>
          </form>
        </div>
        {/* JSON Preview */}
        <div className="bg-white rounded-lg shadow p-8 m-8" style={{ minWidth: "300px", width: "500px", maxWidth: "100%" }}>
  <JsonPreview />
</div>
      </div>
    </FormProvider>
  );
}

export default App;