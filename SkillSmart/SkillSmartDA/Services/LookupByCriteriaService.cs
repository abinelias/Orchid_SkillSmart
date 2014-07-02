using MongoDB.Driver;
using MongoDB.Driver.Builders;
using SkillSmart.Base.Services;
using SkillSmart.Utilities;
using System.Collections.Generic;
using System.Linq;

namespace SkillSmartMongoDA.Services
{
    using Entities;
    public class LookupByCriteriaService : EntityService<LookupByCriteria>, ILookupByCriteriaService<SkillSmart.Dto.LookupByCriteria>
    {
        public LookupByCriteriaService(MongoDatabase mongoDatabase, string collectionName)
            : base(mongoDatabase, collectionName)
        { }

        /// <summary>
        /// Function to get elements based on a categoryId
        /// </summary>
        /// <param name="parentId">parentId</param>
        /// <returns>list of object </returns>
        public IEnumerable<SkillSmart.Dto.LookupByCriteria> GetAll(string parentId)
        {
            var DropList = this.MongoCollection.FindAllAs<LookupByCriteria>();

            List<SkillSmart.Dto.LookupByCriteria> listCursor = new List<SkillSmart.Dto.LookupByCriteria>();
            foreach (LookupByCriteria list in DropList)
            {
                if(list.ParentId == parentId)
                {
                    SkillSmart.Dto.LookupByCriteria listObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.LookupByCriteria, SkillSmart.Dto.LookupByCriteria>(list);
                    listCursor.Add(listObj);
                }
            }
            return listCursor.OrderBy(p => p.Name);
        }

        /// <summary>
        /// Function to create a collection for lookup
        /// </summary>
        /// <param name="entity">lookup object</param>
        public void Create(SkillSmart.Dto.LookupByCriteria entity)
        {
            LookupByCriteria seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.LookupByCriteria, SkillSmartMongoDA.Entities.LookupByCriteria>(entity);
            base.Create(seeker);
        }

        public new SkillSmart.Dto.LookupByCriteria GetById(string id)
        {

            SkillSmart.Dto.LookupByCriteria list = new SkillSmart.Dto.LookupByCriteria ();
            list.Name = "Test";
            return list;
        }

        public void Update(SkillSmart.Dto.LookupByCriteria entity)
        {
            
        }

        public void Delete(SkillSmart.Dto.LookupByCriteria entity)
        {
           
        }

        /*/// <summary>
        /// Function to get all details of lookup table
        /// </summary>
        /// <returns>object of lookup collection</returns>
        public IEnumerable<SkillSmart.Dto.LookupByCriteria> GetAll()
        {
            var DropList = this.MongoCollection.FindAllAs<LookupByCriteria>();

            List<SkillSmart.Dto.LookupByCriteria> listCursor = new List<SkillSmart.Dto.LookupByCriteria>();
            foreach (LookupByCriteria list in DropList)
            {
                SkillSmart.Dto.LookupByCriteria listObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.LookupByCriteria, SkillSmart.Dto.LookupByCriteria>(list);
                listCursor.Add(listObj);
            }
            return listCursor;
        }*/
    }
}
