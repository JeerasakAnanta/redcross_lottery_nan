import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

const Navbar: React.FC = () => {
  return (
    <Disclosure>
      {({}) => (
        <>
          <DisclosureButton
            as="div"
            className="bg-gray-900 text-white flex justify-between items-center px-4 py-2"
          >
            <Bars3Icon className="h-6 w-6" />
            <span>Admin Dashboard</span>
            <BellIcon className="h-6 w-6" />
          </DisclosureButton>
          <DisclosurePanel as="nav" className="bg-gray-600 text-white">
            <Menu as="div" className="relative flex flex-col">
              <MenuButton
                as="div"
                className="bg-gray-600 text-white flex justify-between items-center px-4 py-2"
              >
                <span>Dashboard</span>
                <XMarkIcon className="h-6 w-6" />
              </MenuButton>
              <Menu.Items className="bg-gray-600 divide-y divide-white rounded-md shadow-lg">
                <MenuItem
                  as="a"
                  href="/"
                  className="block px-4 py-2 hover:bg-gray-300"
                >
                  หน้าเเรก
                </MenuItem>
                <MenuItem
                  as="a"
                  href="/insert"
                  className="block px-4 py-2 hover:bg-gray-300"
                >
                  เพิ่มข้อมูล
                </MenuItem>
              </Menu.Items>
            </Menu>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
