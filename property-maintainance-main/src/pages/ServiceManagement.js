import React from 'react'
import AddService from '../components/ServiceManagement/AddService';
import DeleteService from '../components/ServiceManagement/DeleteService';
import UpdateService from '../components/ServiceManagement/UpdateService';
import Tabs from '../components/UI/Tabs';

const ServiceManagementPage = (props) => {
  const tabs = [
    {
        key: 1,
        href: "tabs-addFill",
        id: "tabs-add-tabFill",
        label: `Add Service`,
        active: true,
        content: <AddService/>
    },
    {
        key: 2,
        href: "tabs-updateFill",
        id: "tabs-update-tabFill",
        label: `Update Service`,
        active: false,
        content: <UpdateService/>
    },
    {
        key: 3,
        href: "tabs-deleteFill",
        id: "tabs-delete-tabFill",
        label: `Delete Service`,
        active: false,
        content: <DeleteService/>
    },
  ]
  return (
    <div>
      <Tabs tabs={tabs}/>
    </div>
  )
}

export default ServiceManagementPage;