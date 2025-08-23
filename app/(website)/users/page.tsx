"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit, 
  ShoppingBag, 
  Camera,
  Package,
  Truck,
  CheckCircle,
  Clock,
  Eye,
  X,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const UsersPage = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [editForm, setEditForm] = useState({
    name: "Rahul Sharma",
    email: "rahul.sharma@email.com",
    phone: "+91 98765 43210",
    location: "Mumbai, Maharashtra"
  });

  // Mock user data
  const user = {
    name: editForm.name,
    email: editForm.email,
    phone: editForm.phone,
    location: editForm.location,
    joinDate: "January 2023",
    avatar: "/images/logo.png",
    totalOrders: 24,
    totalSpent: "₹45,680",
    loyaltyPoints: 1250
  };

  const orders = [
    { 
      id: 1, 
      product: "LED Bulb 9W", 
      status: "Delivered", 
      date: "2024-01-15", 
      amount: "₹150",
      orderId: "ORD-001",
      trackingId: "TRK123456789",
      description: "High-quality LED bulb with 9W power consumption, perfect for indoor lighting",
      category: "Indoor Lighting",
      quantity: 2,
      deliveryAddress: "123 Main Street, Mumbai, Maharashtra 400001",
      paymentMethod: "Credit Card",
      estimatedDelivery: "2024-01-15"
    },
    { 
      id: 2, 
      product: "Solar Garden Light", 
      status: "In Transit", 
      date: "2024-01-12", 
      amount: "₹450",
      orderId: "ORD-002",
      trackingId: "TRK987654321",
      description: "Solar-powered garden light with automatic dusk-to-dawn operation",
      category: "Outdoor Lighting",
      quantity: 1,
      deliveryAddress: "123 Main Street, Mumbai, Maharashtra 400001",
      paymentMethod: "UPI",
      estimatedDelivery: "2024-01-18"
    },
    { 
      id: 3, 
      product: "Tent Decoration Set", 
      status: "Processing", 
      date: "2024-01-10", 
      amount: "₹2,500",
      orderId: "ORD-003",
      trackingId: "TRK456789123",
      description: "Complete tent decoration set with LED lights, fabric, and accessories",
      category: "Tent Decoration",
      quantity: 1,
      deliveryAddress: "123 Main Street, Mumbai, Maharashtra 400001",
      paymentMethod: "Net Banking",
      estimatedDelivery: "2024-01-25"
    },
    { 
      id: 4, 
      product: "Outdoor Flood Light", 
      status: "Delivered", 
      date: "2024-01-08", 
      amount: "₹800",
      orderId: "ORD-004",
      trackingId: "TRK789123456",
      description: "High-power outdoor flood light for security and area illumination",
      category: "Outdoor Lighting",
      quantity: 1,
      deliveryAddress: "123 Main Street, Mumbai, Maharashtra 400001",
      paymentMethod: "Credit Card",
      estimatedDelivery: "2024-01-08"
    },
    { 
      id: 5, 
      product: "Indoor Panel Light", 
      status: "Delivered", 
      date: "2024-01-05", 
      amount: "₹1,200",
      orderId: "ORD-005",
      trackingId: "TRK321654987",
      description: "Modern LED panel light for ceiling installation with dimmable feature",
      category: "Indoor Lighting",
      quantity: 1,
      deliveryAddress: "123 Main Street, Mumbai, Maharashtra 400001",
      paymentMethod: "UPI",
      estimatedDelivery: "2024-01-05"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'In Transit':
        return <Truck className="w-4 h-4 text-blue-500" />;
      case 'Processing':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <Package className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'In Transit':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleEditSubmit = () => {
    // Here you would typically save to backend
    setIsEditModalOpen(false);
  };

  const handleViewOrderDetails = (order: any) => {
    setSelectedOrder(order);
    setIsOrderDetailsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Side - Profile Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white shadow-lg border-0">
                <CardContent className="p-6">
                  {/* Profile Header */}
                  <div className="text-center mb-6">
                    <div className="relative inline-block mb-4">
                      <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-red-400 to-red-600 text-white">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0 bg-white shadow-md hover:bg-gray-50"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <h2 className="text-xl font-bold text-gray-900 mb-1">{user.name}</h2>
                    <p className="text-gray-600 text-sm mb-3">Member since {user.joinDate}</p>
                    
                    <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                      Premium Member
                    </Badge>
                  </div>

                  {/* Profile Actions */}
                  <div className="space-y-3 mb-6">
                    <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-[#E10600] hover:bg-[#C10500] text-white">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Profile
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Edit Profile</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              value={editForm.name}
                              onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={editForm.email}
                              onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              value={editForm.phone}
                              onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label htmlFor="location">Location</Label>
                            <Input
                              id="location"
                              value={editForm.location}
                              onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                            />
                          </div>
                          <div className="flex gap-3 pt-4">
                            <Button onClick={handleEditSubmit} className="flex-1 bg-[#E10600] hover:bg-[#C10500]">
                              Save Changes
                            </Button>
                            <Button variant="outline" onClick={() => setIsEditModalOpen(false)} className="flex-1">
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>

                  {/* Profile Details */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-sm">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{user.email}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 text-sm">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{user.phone}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 text-sm">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{user.location}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 text-sm">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">Joined {user.joinDate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Side - Orders Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ShoppingBag className="w-5 h-5 text-[#E10600]" />
                    <span>My Orders</span>
                    <Badge variant="secondary" className="ml-2">
                      {orders.length} orders
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: order.id * 0.1 }}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              {getStatusIcon(order.status)}
                              <h3 className="font-semibold text-gray-900">{order.product}</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                              <div>
                                <span className="font-medium">Date:</span> {order.date}
                              </div>
                              <div>
                                <span className="font-medium">Amount:</span> 
                                <span className="font-semibold text-gray-900 ml-1">{order.amount}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end space-y-2">
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewOrderDetails(order)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View Details
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      <Dialog open={isOrderDetailsModalOpen} onOpenChange={setIsOrderDetailsModalOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-[#E10600]" />
              <span>Order Details</span>
            </DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6 py-4">
              {/* Order Header */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{selectedOrder.product}</h3>
                  <Badge className={getStatusColor(selectedOrder.status)}>
                    {selectedOrder.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Order Date:</span>
                    <p className="text-gray-900">{selectedOrder.date}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Amount:</span>
                    <p className="text-gray-900 font-semibold">{selectedOrder.amount}</p>
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Product Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Category:</span>
                    <p className="text-gray-900">{selectedOrder.category}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Quantity:</span>
                    <p className="text-gray-900">{selectedOrder.quantity}</p>
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Description:</span>
                  <p className="text-gray-900 mt-1">{selectedOrder.description}</p>
                </div>
              </div>

              {/* Delivery Information */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Delivery Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Delivery Address:</span>
                    <p className="text-gray-900 mt-1">{selectedOrder.deliveryAddress}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Estimated Delivery:</span>
                    <p className="text-gray-900">{selectedOrder.estimatedDelivery}</p>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Payment Information</h4>
                <div className="text-sm">
                  <span className="font-medium text-gray-600">Payment Method:</span>
                  <p className="text-gray-900">{selectedOrder.paymentMethod}</p>
                </div>
              </div>

              {/* Close Button */}
              <div className="flex justify-end pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsOrderDetailsModalOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersPage;
