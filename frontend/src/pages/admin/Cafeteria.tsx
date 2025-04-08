import React, { useState, useCallback, useEffect } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { CantineCategory, MenuAdminItem } from "@/types";
import {
  Plus,
  Coffee,
  Clock,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Eye,
  PlusCircle,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const token = localStorage.getItem("token");

const CafeteriaAdmin = () => {
  const [activeTab, setActiveTab] = useState("categories");
  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
  });
  const [menuData, setMenuData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    images: [] as File[],
  });
  const [dailyMenuData, setDailyMenuData] = useState({
    name: "",
    description: "",
  });
  const [categories, setCategories] = useState<CantineCategory[]>([]);
  const [menus, setMenus] = useState<MenuAdminItem[]>([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [editItem, setEditItem] = useState<MenuAdminItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [imageIndexes, setImageIndexes] = useState<Record<string, number>>({});
  const [viewVariantItem, setViewVariantItem] = useState(null);
  const [createVariantMenuId, setCreateVariantMenuId] = useState(null);
  const [newVariant, setNewVariant] = useState({
    name: "",
    price: "",
    currency: "XOF",
    defaultStock: 0,
    images: [] as File[],
  });

  const handleCreateVariant = async () => {
    // Send newVariant with createVariantMenuId to backend
    console.log("Create variant", createVariantMenuId, newVariant);
    try {
      const formData = new FormData();
      formData.append("name", newVariant.name);
      formData.append("price", newVariant.price);
      formData.append("defaultStock", newVariant.defaultStock.toString());
      formData.append("currency", newVariant.currency);
      formData.append("menuId", createVariantMenuId);
      newVariant.images.forEach((image, index) => {
        formData.append("images", image);
      });
      const response = await axios.post(
        `${backendUrl}/api/variants`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Variant created successfully");
      setCreateVariantMenuId(null);
    } catch (error) {
      console.error("Error creating variant:", error);
      toast.error("Error creating variant");
    }
  };

  const openViewVariantsDialog = (item: MenuAdminItem) =>
    setViewVariantItem(item);
  const openCreateVariantDialog = (menuId: string) =>
    setCreateVariantMenuId(menuId);

  const handleImageNavigation = (id: string, direction: -1 | 1) => {
    setImageIndexes((prev) => {
      const current = prev[id] || 0;
      const menu = menus.find((m) => m._id === id);
      if (!menu) return prev;

      const newIndex = current + direction;
      if (newIndex < 0 || newIndex >= menu.images.length) return prev;

      return { ...prev, [id]: newIndex };
    });
  };

  const openEditForm = (item: MenuAdminItem) => {
    setEditItem({ ...item });
  };

  const handleUpdateMenu = async () => {
    if (!editItem) return;
    try {
      const updated = {
        name: editItem.name,
        description: editItem.description,
        price: editItem.price,
      };
      await axios.put(`${backendUrl}/api/menus/${editItem._id}`, updated, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Menu updated");
      setEditItem(null);
      // re-fetch or update menus
    } catch (err) {
      console.error(err);
      toast.error("Failed to update");
    }
  };

  const openDeleteDialog = (id: string) => {
    setDeleteId(id);
  };

  const handleDeleteMenu = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`${backendUrl}/api/menus/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Deleted successfully");
      setDeleteId(null);
      // re-fetch or update menus
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete");
    }
  };

  const handleCategorySubmit = async () => {
    try {
      await axios.post(`${backendUrl}/api/categories`, categoryData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Category added successfully");
      setCategoryData({ name: "", description: "" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to add category");
    }
  };

  const handleMenuSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", menuData.name);
      formData.append("description", menuData.description);
      formData.append("price", menuData.price);
      formData.append("category", menuData.category);
      menuData.images.forEach((image, index) => {
        formData.append("images", image);
      });

      await axios.post(`${backendUrl}/api/menus`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Menu item added successfully");
      setMenuData({
        name: "",
        description: "",
        price: "",
        category: "",
        images: [],
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to add menu item");
    }
  };

  const handleDailySubmit = async () => {
    try {
      await axios.post(`${backendUrl}/api/daily`, dailyMenuData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Daily menu added successfully");
      setDailyMenuData({ name: "", description: "" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to add daily menu");
    }
  };

  const getButtonText = () => {
    switch (activeTab) {
      case "categories":
        return "Add Category";
      case "menu":
        return "Add Menu Item";
      case "daily":
        return "Add Daily Menu";
      default:
        return "";
    }
  };

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(response.data);
      console.log("Categories: ", response.data);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  const fetchMenus = useCallback(async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/menus`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMenus(response.data);
      console.log("Menus: ", response.data);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  useEffect(() => {
    fetchCategories();
    fetchMenus();
  }, [fetchCategories, fetchMenus]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Cafeteria Management</h1>
          {activeTab !== "orders" && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-cafeteria hover:bg-cafeteria/90">
                  <Plus className="mr-2 h-4 w-4" /> {getButtonText()}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{getButtonText()}</DialogTitle>
                </DialogHeader>

                {/* Category Form */}
                {activeTab === "categories" && (
                  <div className="space-y-4">
                    <Input
                      placeholder="Name"
                      value={categoryData.name}
                      onChange={(e) =>
                        setCategoryData({
                          ...categoryData,
                          name: e.target.value,
                        })
                      }
                    />
                    <Input
                      placeholder="Description"
                      value={categoryData.description}
                      onChange={(e) =>
                        setCategoryData({
                          ...categoryData,
                          description: e.target.value,
                        })
                      }
                    />
                    <Button onClick={handleCategorySubmit}>Submit</Button>
                  </div>
                )}

                {/* Menu Form */}
                {activeTab === "menu" && (
                  <div className="space-y-4">
                    {categories.length === 0 ? (
                      <p className="text-sm text-red-500">
                        Please create a category before adding a menu item.
                      </p>
                    ) : (
                      <>
                        {/* Image Upload */}
                        <div className="space-y-2">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const files = e.target.files;
                              if (!files) return;

                              const newFiles = Array.from(files);
                              if (
                                menuData.images.length + newFiles.length >
                                4
                              ) {
                                toast.error(
                                  "You can only upload up to 4 images."
                                );
                                return;
                              }

                              setMenuData({
                                ...menuData,
                                images: [...menuData.images, ...newFiles],
                              });
                            }}
                            disabled={menuData.images.length >= 4}
                          />

                          {menuData.images.length > 0 && (
                            <div className="flex items-center gap-4">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setImageIndex((i) => i - 1)}
                                disabled={imageIndex === 0}
                              >
                                ←
                              </Button>

                              <img
                                src={URL.createObjectURL(
                                  menuData.images[imageIndex]
                                )}
                                alt="Preview"
                                className="w-32 h-32 object-cover rounded"
                              />

                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setImageIndex((i) => i + 1)}
                                disabled={
                                  imageIndex === menuData.images.length - 1
                                }
                              >
                                →
                              </Button>
                            </div>
                          )}
                        </div>

                        <Input
                          placeholder="Name"
                          value={menuData.name}
                          onChange={(e) =>
                            setMenuData({ ...menuData, name: e.target.value })
                          }
                        />
                        <Input
                          placeholder="Description"
                          value={menuData.description}
                          onChange={(e) =>
                            setMenuData({
                              ...menuData,
                              description: e.target.value,
                            })
                          }
                        />
                        <Input
                          type="number"
                          placeholder="Price"
                          value={menuData.price}
                          onChange={(e) =>
                            setMenuData({ ...menuData, price: e.target.value })
                          }
                        />
                        <Select
                          onValueChange={(value) =>
                            setMenuData({ ...menuData, category: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat._id} value={cat._id}>
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button onClick={handleMenuSubmit}>Submit</Button>
                      </>
                    )}
                  </div>
                )}

                {/* Daily Menu Form */}
                {activeTab === "daily" && (
                  <div className="space-y-4">
                    <Input
                      placeholder="Name"
                      value={dailyMenuData.name}
                      onChange={(e) =>
                        setDailyMenuData({
                          ...dailyMenuData,
                          name: e.target.value,
                        })
                      }
                    />
                    <Input
                      placeholder="Description"
                      value={dailyMenuData.description}
                      onChange={(e) =>
                        setDailyMenuData({
                          ...dailyMenuData,
                          description: e.target.value,
                        })
                      }
                    />
                    <Button onClick={handleDailySubmit}>Submit</Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          )}
        </div>

        <Tabs defaultValue="categories" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="menu">Menu Items</TabsTrigger>
            <TabsTrigger value="daily">Daily Menu</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="categories" className="space-y-4 mt-6">
            {categories.map((category) => (
              <Card key={category._id}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>{category.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    {/* Edit Dialog */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Edit</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Category</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Input
                            placeholder="Name"
                            value={category.name}
                            onChange={(e) =>
                              setCategories((prev) =>
                                prev.map((c) =>
                                  c._id === category._id
                                    ? { ...c, name: e.target.value }
                                    : c
                                )
                              )
                            }
                          />
                          <Input
                            placeholder="Description"
                            value={category.description}
                            onChange={(e) =>
                              setCategories((prev) =>
                                prev.map((c) =>
                                  c._id === category._id
                                    ? { ...c, description: e.target.value }
                                    : c
                                )
                              )
                            }
                          />
                          <Button
                            onClick={async () => {
                              try {
                                await axios.put(
                                  `${backendUrl}/api/categories?_id=${category._id}`,
                                  {
                                    name: category.name,
                                    description: category.description,
                                  },
                                  {
                                    headers: {
                                      Authorization: `Bearer ${token}`,
                                    },
                                  }
                                );
                                setCategories((prev) =>
                                  prev.map((c) =>
                                    c._id === category._id
                                      ? {
                                          ...c,
                                          name: category.name,
                                          description: category.description,
                                        }
                                      : c
                                  )
                                );
                                toast.success("Category updated successfully");
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            Save
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {/* Delete AlertDialog */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">Delete</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Category</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{category.name}"?
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={async () => {
                              try {
                                await axios.delete(
                                  `${backendUrl}/api/categories/${category._id}`,
                                  {
                                    headers: {
                                      Authorization: `Bearer ${token}`,
                                    },
                                  }
                                );
                                setCategories((prev) =>
                                  prev.filter((c) => c._id !== category._id)
                                );
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="menu" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menus.length === 0 ? (
                <div className="col-span-full text-center text-muted-foreground">
                  No menu items found.
                </div>
              ) : (
                menus.map((item) => {
                  const imageIndex = imageIndexes[item._id] || 0;
                  return (
                    <Card key={item._id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex justify-between">
                          <div className="flex items-right gap-2 mr-10">
                            <span>{item.name}</span>
                            <span className="text-cafeteria">
                              {item.price.value} {item.price.currency}
                            </span>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="w-5 h-5" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() =>
                                  openCreateVariantDialog(item._id)
                                }
                              >
                                <PlusCircle className="w-4 h-4 mr-2" />
                                Create Variant
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => openViewVariantsDialog(item)}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                View Variants
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="relative aspect-video bg-muted rounded-md mb-3 flex items-center justify-center overflow-hidden">
                          {item.images.length > 0 ? (
                            <>
                              <img
                                src={item.images[imageIndex]?.url}
                                alt={item.name}
                                className="object-cover w-full h-full"
                              />
                              <Button
                                size="icon"
                                variant="ghost"
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white disabled:opacity-50"
                                onClick={() =>
                                  handleImageNavigation(item._id, -1)
                                }
                                disabled={imageIndex <= 0}
                              >
                                <ChevronLeft className="w-5 h-5" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white disabled:opacity-50"
                                onClick={() =>
                                  handleImageNavigation(item._id, 1)
                                }
                                disabled={imageIndex >= item.images.length - 1}
                              >
                                <ChevronRight className="w-5 h-5" />
                              </Button>
                            </>
                          ) : (
                            <Coffee className="h-8 w-8 text-muted-foreground" />
                          )}
                        </div>

                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.description}
                        </p>
                        <div className="flex gap-2 mt-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEditForm(item)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => openDeleteDialog(item._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>

            {/* Edit Form Dialog */}
            <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Menu Item</DialogTitle>
                </DialogHeader>
                {editItem && (
                  <div className="space-y-4">
                    <Input
                      value={editItem.name}
                      onChange={(e) =>
                        setEditItem({ ...editItem, name: e.target.value })
                      }
                      placeholder="Name"
                    />
                    <Input
                      value={editItem.description}
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          description: e.target.value,
                        })
                      }
                      placeholder="Description"
                    />
                    <Input
                      type="number"
                      value={editItem.price.value}
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          price: {
                            ...editItem.price,
                            value: Number(e.target.value),
                          },
                        })
                      }
                      placeholder="Price"
                    />
                    <Button onClick={handleUpdateMenu}>Save</Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog
              open={!!deleteId}
              onOpenChange={() => setDeleteId(null)}
            >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this menu item?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. Are you sure you want to
                    delete this item?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setDeleteId(null)}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteMenu}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            {/* View Variants Dialog */}
            <Dialog
              open={!!viewVariantItem}
              onOpenChange={() => setViewVariantItem(null)}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Variants for {viewVariantItem?.name}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-2">
                  {viewVariantItem?.variants?.length ? (
                    viewVariantItem.variants.map((variant, idx) => (
                      <div key={idx} className="border p-2 rounded-md">
                        <p className="font-medium">{variant.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {variant.price.value} {variant.price.currency}
                        </p>
                        <p className="text-sm">Stock: {variant.defaultStock}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No variants found.</p>
                  )}
                </div>
              </DialogContent>
            </Dialog>
            {/* Create Variant Dialog */}
            <Dialog
              open={!!createVariantMenuId}
              onOpenChange={() => setCreateVariantMenuId(null)}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Variant</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                <div className="space-y-2">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const files = e.target.files;
                              if (!files) return;

                              const newFiles = Array.from(files);
                              if (
                                newVariant.images.length + newFiles.length >
                                4
                              ) {
                                toast.error(
                                  "You can only upload up to 4 images."
                                );
                                return;
                              }

                              setNewVariant({
                                ...newVariant,
                                images: [...newVariant.images, ...newFiles],
                              });
                            }}
                            disabled={newVariant.images.length >= 4}
                          />

                          {newVariant.images.length > 0 && (
                            <div className="flex items-center gap-4">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setImageIndex((i) => i - 1)}
                                disabled={imageIndex === 0}
                              >
                                ←
                              </Button>

                              <img
                                src={URL.createObjectURL(
                                  newVariant.images[imageIndex]
                                )}
                                alt="Preview"
                                className="w-32 h-32 object-cover rounded"
                              />

                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setImageIndex((i) => i + 1)}
                                disabled={
                                  imageIndex === newVariant.images.length - 1
                                }
                              >
                                →
                              </Button>
                            </div>
                          )}
                        </div>
                  <Input
                    placeholder="Variant Name"
                    value={newVariant.name}
                    onChange={(e) =>
                      setNewVariant({ ...newVariant, name: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Price"
                    type="number"
                    value={newVariant.price}
                    onChange={(e) =>
                      setNewVariant({ ...newVariant, price: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Currency"
                    value={newVariant.currency}
                    onChange={(e) =>
                      setNewVariant({ ...newVariant, currency: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Stock"
                    type="number"
                    value={newVariant.defaultStock}
                    onChange={(e) =>
                      setNewVariant({
                        ...newVariant,
                        defaultStock: Number(e.target.value),
                      })
                    }
                  />
                  {/* Optional: Image uploader here */}
                  <Button onClick={handleCreateVariant}>Create</Button>
                </div>
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="daily" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Today's Menu (April 6, 2025)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-3">
                      <Coffee className="h-5 w-5 text-cafeteria" />
                      <span>Monday Special - Pasta Day</span>
                    </div>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-md p-4">
                      <h3 className="font-medium">Breakfast</h3>
                      <ul className="mt-2 space-y-2">
                        <li>Eggs & Toast - $3.99</li>
                        <li>Oatmeal - $2.50</li>
                        <li>Fruit Parfait - $4.25</li>
                      </ul>
                    </div>
                    <div className="border rounded-md p-4">
                      <h3 className="font-medium">Lunch</h3>
                      <ul className="mt-2 space-y-2">
                        <li>Spaghetti & Meatballs - $8.99</li>
                        <li>Fettuccine Alfredo - $7.50</li>
                        <li>Vegetable Lasagna - $9.25</li>
                      </ul>
                    </div>
                  </div>
                  <Button className="w-full">Update Daily Menu</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b pb-4"
                    >
                      <div>
                        <p className="font-medium">Order #{1000 + index}</p>
                        <div className="text-sm text-muted-foreground mt-1">
                          {
                            [
                              "Cheeseburger & Fries",
                              "Veggie Wrap & Salad",
                              "Pizza Combo",
                              "Chicken Meal",
                              "Daily Special",
                            ][index]
                          }
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3" />
                          <span className="text-xs">
                            {
                              [
                                "2 minutes ago",
                                "15 minutes ago",
                                "32 minutes ago",
                                "45 minutes ago",
                                "1 hour ago",
                              ][index]
                            }
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {index < 2 ? (
                          <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs text-yellow-800">
                            <Clock className="mr-1 h-3 w-3" />
                            Pending
                          </span>
                        ) : index < 4 ? (
                          <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-800">
                            <Coffee className="mr-1 h-3 w-3" />
                            Preparing
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs text-green-800">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Ready
                          </span>
                        )}
                        <div className="flex gap-1">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8"
                          >
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </Button>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8"
                          >
                            <XCircle className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default CafeteriaAdmin;
