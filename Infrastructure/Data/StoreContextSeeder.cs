using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data
{
    public class StoreContextSeeder
    {
        public static async Task SeedAsync(StoreContext context, ILoggerFactory loggerFactory)
        {
            try
            {
                if (!context.ProductBrands.Any())
                {
                    var data = File.ReadAllText("../Infrastructure/Data/Seeds/brands.json");
                    var objs = JsonSerializer.Deserialize<List<ProductBrand>>(data);
                    context.ProductBrands.AddRange(objs);
                    await context.SaveChangesAsync();
                }

                if (!context.ProductTypes.Any())
                {
                    var data = File.ReadAllText("../Infrastructure/Data/Seeds/types.json");
                    var objs = JsonSerializer.Deserialize<List<ProductType>>(data);
                    context.ProductTypes.AddRange(objs);
                    await context.SaveChangesAsync();
                }

                if (!context.Products.Any())
                {
                    var data = File.ReadAllText("../Infrastructure/Data/Seeds/products.json");
                    var objs = JsonSerializer.Deserialize<List<Product>>(data);
                    context.Products.AddRange(objs);
                    await context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                var logger = loggerFactory.CreateLogger<StoreContextSeeder>();
                logger.LogError(ex.Message);
            }
        }
    }
}