import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { ShoppingBasket, Store, LocalShipping } from '@mui/icons-material';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          About Machhenarayan Mart
        </Typography>

        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Our Story
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Machhenarayan Mart is your trusted destination for fresh groceries and quality
              essentials. We are committed to providing the best quality products directly
              from local farms and trusted suppliers to your doorstep.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
              Our mission is to make fresh, quality groceries accessible to everyone. We believe
              in supporting local farmers and providing our customers with the freshest produce
              possible.
            </Typography>
          </CardContent>
        </Card>

        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Why Choose Us
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <ShoppingBasket sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                  Fresh Products
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  We source our products fresh from local farms every day.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Store sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                  Quality Guaranteed
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  We ensure the highest quality standards for all products.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <LocalShipping sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                  Fast Delivery
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Quick and reliable delivery to your doorstep.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default About;