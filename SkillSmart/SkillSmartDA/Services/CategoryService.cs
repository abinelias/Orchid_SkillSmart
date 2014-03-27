using MongoDB.Driver;
using MongoDB.Driver.Builders;
using SkillSmart.Base.Services;
using SkillSmart.Utilities;
using System.Collections.Generic;
using MongoDB.Driver.Linq;
namespace SkillSmartMongoDA.Services
{
    using Entities;
    public class CategoryService : EntityService<Category>, ICategoryService<SkillSmart.Dto.Category>
    {
        public CategoryService(MongoDatabase mongoDatabase)
            : base(mongoDatabase)
        { }

        /// <summary>
        /// Function to get all Category by parentId
        /// </summary>
        /// <param name="id">CategoryId</param>
        /// <returns>Category object</returns>
        public IEnumerable<SkillSmart.Dto.Category> GetAllCategoryById(string id)
        {
            var categoryList = this.MongoCollection.FindAllAs<Category>();
            
            List<SkillSmart.Dto.Category> category = new List<SkillSmart.Dto.Category>();
            foreach (Category jobSeeker in categoryList)
            {
                if (jobSeeker.ParentId.ToString() == id)
                {
                    SkillSmart.Dto.Category jobSeekerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.Category, SkillSmart.Dto.Category>(jobSeeker);
                    category.Add(jobSeekerObj);
                }
            }
            return category;
        }

        /// <summary>
        /// Function to create a Category
        /// </summary>
        /// <param name="entity">Category object</param>
        public void Create(SkillSmart.Dto.Category entity)
        {
            Category seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.Category, SkillSmartMongoDA.Entities.Category>(entity);
            base.Create(seeker);
        }

        /// <summary>
        /// Function to get a Category details
        /// </summary>
        /// <param name="id">CategoryId</param>
        /// <returns>Category object</returns>
        public new SkillSmart.Dto.Category GetById(string id)
        {
            Category dbObj = base.GetById(id);
            SkillSmart.Dto.Category seeker = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.Category, SkillSmart.Dto.Category>(dbObj);
            return seeker;
        }

        /// <summary>
        /// Function to Update a Category
        /// </summary>
        /// <param name="entity">Category object</param>
        public void Update(SkillSmart.Dto.Category entity)
        {
            Category seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.Category, SkillSmartMongoDA.Entities.Category>(entity);
            base.Update(seeker);         
        }

        public void Delete(SkillSmart.Dto.Category entity)
        {
           
        }
    }
}
