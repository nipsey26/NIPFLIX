"use client";

import { useEffect, useState } from "react";

type Settings = {

  id:string;

  siteName:string;

  description:string | null;

  logo:string | null;

  heroTitle:string | null;

  heroDescription:string | null;

  maintenance:boolean;

};



export default function SettingsPage(){


  const [settings,setSettings] =
    useState<Settings | null>(null);


  const [saving,setSaving] =
    useState(false);


  const [message,setMessage] =
    useState("");





  async function loadSettings(){


    const response =
      await fetch("/api/admin/settings");


    const data =
      await response.json();


    setSettings(data);


  }





  useEffect(()=>{

    loadSettings();

  },[]);






  function updateField(

    field:keyof Settings,

    value:any

  ){

    if(!settings)return;


    setSettings({

      ...settings,

      [field]:value,

    });

  }







  async function saveSettings(){


    if(!settings)return;


    setSaving(true);

    setMessage("");



    const response =
      await fetch(

        "/api/admin/settings",

        {

          method:"PATCH",

          headers:{

            "Content-Type":"application/json",

          },

          body:JSON.stringify(settings),

        }

      );



    if(response.ok){

      setMessage(
        "✅ Settings updated successfully"
      );

    }else{

      setMessage(
        "❌ Failed saving settings"
      );

    }


    setSaving(false);


  }







  if(!settings){


    return (

      <main className="
      text-2xl
      font-black
      ">

        Loading settings...

      </main>

    );

  }








  return (

    <main className="space-y-10">





      <section

        className="
        bg-neutral-950
        border
        border-white/10
        rounded-3xl
        p-10
        "

      >

        <p className="
        text-red-500
        tracking-[0.4em]
        font-black
        ">

          NIPFLIX CONTROL

        </p>


        <h1 className="
        text-6xl
        font-black
        mt-5
        ">

          Platform Settings

        </h1>


        <p className="
        text-gray-400
        mt-4
        text-xl
        ">

          Manage your brand, homepage and system controls.

        </p>


      </section>








      <section

        className="
        grid
        lg:grid-cols-3
        gap-8
        "

      >





        <div

          className="
          bg-neutral-950
          border
          border-white/10
          rounded-3xl
          p-8
          lg:col-span-2
          space-y-6
          "

        >



          <Input

            label="Site Name"

            value={settings.siteName}

            onChange={
              value=>updateField(
                "siteName",
                value
              )
            }

          />





          <Textarea

            label="Description"

            value={settings.description || ""}

            onChange={
              value=>updateField(
                "description",
                value
              )
            }

          />






          <Input

            label="Logo URL"

            value={settings.logo || ""}

            onChange={
              value=>updateField(
                "logo",
                value
              )
            }

          />







          <Input

            label="Hero Title"

            value={settings.heroTitle || ""}

            onChange={
              value=>updateField(
                "heroTitle",
                value
              )
            }

          />








          <Textarea

            label="Hero Description"

            value={settings.heroDescription || ""}

            onChange={
              value=>updateField(
                "heroDescription",
                value
              )
            }

          />








          <label className="
          flex
          gap-4
          items-center
          font-bold
          ">


            <input

              type="checkbox"

              checked={settings.maintenance}

              onChange={
                e=>updateField(
                  "maintenance",
                  e.target.checked
                )
              }

              className="
              w-6
              h-6
              "

            />


            Maintenance Mode


          </label>








          <button

            onClick={saveSettings}

            disabled={saving}

            className="
            bg-red-600
            hover:bg-red-700
            px-10
            py-5
            rounded-2xl
            font-black
            text-xl
            "

          >

            {
              saving
              ?
              "Saving..."
              :
              "Save Settings"
            }


          </button>





          {
            message &&

            <p className="
            text-green-400
            font-bold
            ">

              {message}

            </p>

          }





        </div>









        <div

          className="
          bg-neutral-950
          border
          border-white/10
          rounded-3xl
          p-8
          "

        >

          <h2 className="
          text-2xl
          font-black
          mb-5
          ">

            Live Preview

          </h2>




          {
            settings.logo &&

            <img

              src={settings.logo}

              alt="Logo"

              className="
              h-20
              object-contain
              mb-6
              "

            />

          }





          <h3 className="
          text-3xl
          font-black
          ">

            {settings.heroTitle || "NIPFLIX"}

          </h3>



          <p className="
          text-gray-400
          mt-4
          ">

            {
              settings.heroDescription ||
              "Your entertainment platform."
            }

          </p>





        </div>




      </section>






    </main>

  );

}







function Input({

label,
value,
onChange

}:{
label:string;
value:string;
onChange:(value:string)=>void;
}){


return (

<div>

<label className="text-gray-400">
{label}
</label>


<input

value={value}

onChange={
e=>onChange(e.target.value)
}

className="
mt-2
w-full
bg-black
border
border-white/10
rounded-xl
px-5
py-4
"

/>

</div>

);

}







function Textarea({

label,
value,
onChange

}:{
label:string;
value:string;
onChange:(value:string)=>void;
}){


return (

<div>

<label className="text-gray-400">
{label}
</label>


<textarea

value={value}

onChange={
e=>onChange(e.target.value)
}

className="
mt-2
w-full
h-32
bg-black
border
border-white/10
rounded-xl
px-5
py-4
"

/>

</div>

);

}