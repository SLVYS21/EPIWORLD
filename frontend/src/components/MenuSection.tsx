import React from "react";
import { MenuItem, MenuData } from "../types";
import { Plus } from "lucide-react";

interface MenuSectionProps {
  menuData: MenuData;
  onAddToCart: (item: MenuItem) => void;
}

// const MenuSection: React.FC<MenuSectionProps> = ({ title, items, onAddToCart }) => {
//   return (
//     <div className="py-8">
//       {items.some(item => item.isSpecial) && (
//         <h2 className="text-2xl font-semibold mb-6">{title}</h2>
//       )}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {items.map((item) => (
//           <div
//             key={item.id}
//             className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
//           >
//             <img
//               src={item.image}
//               alt={item.name}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h3 className="text-lg font-semibold">{item.name}</h3>
//                   <p className="text-gray-600 text-sm mt-1">{item.description}</p>
//                 </div>
//                 {item.isSpecial && (
//                   <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
//                     Special
//                   </span>
//                 )}
//               </div>
//               <div className="mt-4 flex justify-between items-center">
//                 <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
//                 <button
//                   onClick={() => onAddToCart(item)}
//                   className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2"
//                 >
//                   <Plus className="w-4 h-4" />
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default MenuSection;

const MenuSection: React.FC<MenuSectionProps> = ({ menuData, onAddToCart }) => {
  const { todaysMenu, menus } = menuData;

  const specialItems: MenuItem[] =
    todaysMenu?.plates?.map((plate) => {
      const menu = plate.menu;
      return {
        id: menu._id,
        name: menu.name,
        description: menu.description,
        price: menu.price.value,
        image: menu.images[menu.mainpic] || "",
        isSpecial: true,
      };
    }) || [];

  const regularItems: MenuItem[] = menus.map((item) => ({
    id: item._id,
    name: item.name,
    description: item.description,
    price: item.price.value,
    image: item.images[item.mainpic]?.url || "",
    isSpecial: false,
  }));

  const allItems = [...specialItems, ...regularItems];

  return (
    <div className="py-8">
      {specialItems.length > 0 ? (
        <>
          <h2 className="text-2xl font-semibold mb-6">Today's Specials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {specialItems.map((item) => (
              <MenuCard key={item.id} item={item} onAddToCart={onAddToCart} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500 text-lg mb-10">
          No special menu available today.
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-6">Full Menu</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regularItems.map((item) => (
          <MenuCard key={item.id} item={item} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
};

const MenuCard: React.FC<{
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}> = ({ item, onAddToCart }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <img
      src={item.image}
      alt={item.name}
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-gray-600 text-sm mt-1">{item.description}</p>
        </div>
        {item.isSpecial && (
          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
            Special
          </span>
        )}
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
        <button
          onClick={() => onAddToCart(item)}
          className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  </div>
);

export default MenuSection;
