import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteItem } from '../pages/shop/application/shop';
import { removeFromCart, updateCartCount } from '../pages/Cart/application/cart';
import { toast } from 'react-toastify';
import appState from '../data/AppState';

/**
 *
 * Hook that extracts away complexity from the ShopItem component
 * @param {string} itemId
 * @returns
 */

export default function useShopItemMutations(itemId) {
  const queryClient = useQueryClient();

  const updateCartMutation = useMutation({
    mutationFn: (e) => updateCartCount(itemId, e),
    onError: (e) => {
      console.warn(e);
      toast.error('An error occured while updating the cart!');
      queryClient.invalidateQueries('cart');
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
    }
  });

  const deleteItemFromCartMutation = useMutation({
    mutationFn: () => removeFromCart(itemId),
    onError: (e) => {
      console.warn(e);
      toast.error('An error occured while removing the item from the cart!');
      queryClient.invalidateQueries('cart');
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
    }
  });

  const deleteItemMutation = useMutation({
    mutationFn: () => deleteItem(itemId, appState.userData?._id),
    onError: (e) => {
      toast.error(e.message);
    },
    onSuccess: (e) => {
      console.warn(e);
      queryClient.invalidateQueries(['items']);
    }
  });

  return { updateCartMutation, deleteItemFromCartMutation, deleteItemMutation };
}
