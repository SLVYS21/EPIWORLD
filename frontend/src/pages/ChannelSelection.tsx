import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Utensils, Search, MessageCircleQuestion } from "lucide-react";

const channels = [
  {
    name: "Canteen",
    description: "Order and track your meals",
    icon: <Utensils className="w-12 h-12" />,
    route: "cantine",
    color: "from-orange-500/20 to-red-500/20",
    hoverColor: "group-hover:from-orange-500/30 group-hover:to-red-500/30"
  },
  {
    name: "Lost & Found",
    description: "Find or report lost items",
    icon: <Search className="w-12 h-12" />,
    route: "home",
    color: "from-blue-500/20 to-cyan-500/20",
    hoverColor: "group-hover:from-blue-500/30 group-hover:to-cyan-500/30"
  },
  {
    name: "Q&A Forum",
    description: "Ask questions and share knowledge",
    icon: <MessageCircleQuestion className="w-12 h-12" />,
    route: "stackoverflow",
    color: "from-purple-500/20 to-pink-500/20",
    hoverColor: "group-hover:from-purple-500/30 group-hover:to-pink-500/30"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const ChannelSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Welcome to EpiWorld
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl">
          Choose your destination and start exploring our campus services
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full"
      >
        {channels.map((channel) => (
          <motion.button
            key={channel.name}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`group relative overflow-hidden p-8 rounded-2xl bg-gradient-to-br ${channel.color} border border-white/10 transition-all duration-300`}
            onClick={() => navigate(`/${channel.route}`)}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${channel.color} ${channel.hoverColor} transition-all duration-300 -z-10`} />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300 -z-10" />
            
            <div className="flex flex-col items-center text-center space-y-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="p-4 rounded-full bg-white/10 backdrop-blur-lg"
              >
                {channel.icon}
              </motion.div>
              
              <div>
                <h2 className="text-2xl font-bold mb-2">{channel.name}</h2>
                <p className="text-gray-300 text-sm">{channel.description}</p>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </motion.button>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-center text-gray-400"
      >
        <p>Click on any card to access the respective service</p>
      </motion.div>
    </div>
  );
};

export default ChannelSelection;