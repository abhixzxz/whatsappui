import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AppBar, Toolbar, Typography, Button, IconButton, 
  Drawer, List, ListItem, ListItemIcon, ListItemText,
  Card, CardContent, Grid, Box
} from '@mui/material';
import { 
  FaWhatsapp, FaChartLine, FaUsers, FaCog, FaBell, 
  FaRocket, FaRobot, FaHandshake, FaChartBar
} from 'react-icons/fa';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell
} from 'recharts';

const campaignData = [
  { name: 'Lead Gen', value: 400 },
  { name: 'Nurture', value: 300 },
  { name: 'Upsell', value: 200 },
  { name: 'Support', value: 100 },
];

const engagementData = [
  { name: 'Mon', messages: 1000, responses: 800 },
  { name: 'Tue', messages: 1500, responses: 1200 },
  { name: 'Wed', messages: 2000, responses: 1800 },
  { name: 'Thu', messages: 1800, responses: 1500 },
  { name: 'Fri', messages: 2200, responses: 2000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const MainDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'overview':
        return <OverviewContent />;
      case 'campaigns':
        return <CampaignsContent />;
      case 'analytics':
        return <AnalyticsContent />;
      default:
        return <OverviewContent />;
    }
  };

  return (
    <Box className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500">
      <AppBar position="static" className="bg-transparent shadow-none">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
            <FaCog />
          </IconButton>
          <Typography variant="h6" className="ml-4 flex-grow font-bold">
            Wati Dashboard
          </Typography>
          <IconButton color="inherit">
            <FaBell />
          </IconButton>
          <Button variant="contained" color="secondary" className="bg-purple-600 hover:bg-purple-700">
            Start Free Trial
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          {['Overview', 'Campaigns', 'Analytics', 'Integrations'].map((text, index) => (
            <ListItem button key={text} onClick={() => setActiveTab(text.toLowerCase())}>
              <ListItemIcon>
                {index === 0 ? <FaChartLine /> : 
                 index === 1 ? <FaRocket /> : 
                 index === 2 ? <FaChartBar /> :
                 <FaHandshake />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <main className="container mx-auto mt-8 p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-white bg-opacity-10 mt-8 py-4">
        <div className="container mx-auto text-center text-white">
          <Typography>© 2024 Wati. Empowering WhatsApp Marketing.</Typography>
        </div>
      </footer>
    </Box>
  );
};

const OverviewContent = () => (
  <>
    <Typography variant="h4" className="mb-6 text-white font-bold">Maximize Your WhatsApp Potential</Typography>
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <Card className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg">
          <CardContent>
            <Typography variant="h6" className="font-bold mb-4">Campaign Performance</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={campaignData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {campaignData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg">
          <CardContent>
            <Typography variant="h6" className="font-bold mb-4">Weekly Engagement</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="messages" fill="#8884d8" />
                <Bar dataKey="responses" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    <Grid container spacing={4} className="mt-8 p-6">
  <Grid item xs={12} md={4}>
    <Card className="bg-white bg-opacity-25 shadow-lg rounded-lg backdrop-filter backdrop-blur-lg hover:shadow-xl transition-shadow duration-300">
      <CardContent className="flex flex-col items-center text-center">
        <FaRocket className="text-5xl text-yellow-400 mb-4" />
        <Typography variant="h6" className="font-semibold text-lg mb-2">Lead Generation</Typography>
        <Typography className="text-gray-700">Drive growth with powerful campaigns</Typography>
      </CardContent>
    </Card>
  </Grid>
  <Grid item xs={12} md={4}>
    <Card className="bg-white bg-opacity-25 shadow-lg rounded-lg backdrop-filter backdrop-blur-lg hover:shadow-xl transition-shadow duration-300">
      <CardContent className="flex flex-col items-center text-center">
        <FaRobot className="text-5xl text-blue-400 mb-4" />
        <Typography variant="h6" className="font-semibold text-lg mb-2">Intelligent Auto-Response</Typography>
        <Typography className="text-gray-700">Chatbots with logical workflows</Typography>
      </CardContent>
    </Card>
  </Grid>
  <Grid item xs={12} md={4}>
    <Card className="bg-white bg-opacity-25 shadow-lg rounded-lg backdrop-filter backdrop-blur-lg hover:shadow-xl transition-shadow duration-300">
      <CardContent className="flex flex-col items-center text-center">
        <FaHandshake className="text-5xl text-green-400 mb-4" />
        <Typography variant="h6" className="font-semibold text-lg mb-2">CRM Integration</Typography>
        <Typography className="text-gray-700">Seamless connection with your tools</Typography>
      </CardContent>
    </Card>
  </Grid>
</Grid>

  </>
);

const CampaignsContent = () => (
  <>
    <Typography variant="h4" className="mb-6 text-white font-bold">Campaigns</Typography>
    {/* Add campaign-related content here */}
  </>
);

const AnalyticsContent = () => (
  <>
    <Typography variant="h4" className="mb-6 text-white font-bold">Analytics</Typography>
    {/* Add analytics-related content here */}
  </>
);

export default MainDashboard;