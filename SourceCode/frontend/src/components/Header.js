import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
// Path-specific imports to fix the "Older Version" error
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Header = () => {
  const { cart } = useCart(); // Assuming your context returns an object with cart array
  const { wishlist } = useWishlist();

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2e7d32' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}
        >
          NOVELSTORE
        </Typography>

        <IconButton component={Link} to="/wishlist" color="inherit">
          <Badge badgeContent={wishlist?.length} color="error">
            <FavoriteIcon />
          </Badge>
        </IconButton>

        <IconButton component={Link} to="/checkout" color="inherit">
          <Badge badgeContent={cart?.length} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;