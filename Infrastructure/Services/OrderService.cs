using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly IGenericRepository<Order> _orderRepo;
        private readonly IGenericRepository<DeliveryMethod> _deliveryMethodRepo;
        private readonly IGenericRepository<Product> _productRepo;
        private readonly IBasketRepository _basketRepo;

        public OrderService(IGenericRepository<Order> orderRepo,
                            IGenericRepository<DeliveryMethod> deliveryMethodRepo,
                            IGenericRepository<Product> productRepo,
                            IBasketRepository basketRepo)
        {
            _orderRepo = orderRepo;
            _deliveryMethodRepo = deliveryMethodRepo;
            _productRepo = productRepo;
            _basketRepo = basketRepo;
        }

        public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string basketId, Address shipToAddress)
        {
            var basket = await _basketRepo.GetBasketAsync(basketId);
            var items = new List<OrderItem>();
            foreach (var item in basket.Items)
            {
                var productItem = await _productRepo.GetByIdAsync(item.Id);
                var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, productItem.ImageUrl);
                var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity);
                items.Add(orderItem);
            }

            var deliveryMethod = await _deliveryMethodRepo.GetByIdAsync(deliveryMethodId);

            var subTotal = items.Sum(x => x.Price * x.Quantity);
            var order = new Order(buyerEmail, shipToAddress, deliveryMethod, items, subTotal);

            return order;
        }

        public Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodAsync()
        {
            
        }

        public Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
            
        }

        public Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
        {
            
        }
    }
}
