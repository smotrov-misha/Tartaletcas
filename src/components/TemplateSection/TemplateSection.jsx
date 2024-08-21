import { useState, useEffect } from "react";
import plus from "../../assets/plus.svg";
import "./TemplateSection.css";
import NewTemplate from "../NewTemplate/NewTemplate";
import { connectTemplateToDishes } from "../../backend/TemplateChanges";
import Template from "../Template/Template";
import client from "../../backend/Client";

function TemplateSection() {
  const [newTemplateIsOpened, setNewTemplateIsOpened] = useState(false);
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const subscriptionTemplates =
      client.models.Templates.observeQuery().subscribe({
        next: ({ items }) => {
          setTemplates(items.map((item) => ({ ...item })));
        },
      });
    return () => {
      subscriptionTemplates.unsubscribe();
    };
  }, []);

  const closeNewTemplate = () => {
    setNewTemplateIsOpened(false);
  };

  const openNewTemplate = () => {
    setNewTemplateIsOpened(true);
  };

  return (
    <>
      <div className="above-part-templates">
        <h1>Templates</h1>
        <button className="add-button" onClick={openNewTemplate}>
          <img src={plus}></img>
        </button>
      </div>
      <div className="templates-grid">
        {templates.map((template) => (
          <Template template={template} key={template.id} />
        ))}
      </div>
      {newTemplateIsOpened && (
        <NewTemplate closeNewTemplate={closeNewTemplate} mode="Add" />
      )}
    </>
  );
}

export default TemplateSection;
