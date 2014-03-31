using MongoDB.Driver;
using MongoDB.Driver.Builders;
using SkillSmart.Base.Services;
using SkillSmart.Utilities;
using System.Collections.Generic;
using MongoDB.Driver.Linq;
namespace SkillSmartMongoDA.Services
{
    using Entities;
    public class SkillMapService : EntityService<SkillMap>, ISkillMapService<SkillSmart.Dto.SkillMap>
    {
        public SkillMapService(MongoDatabase mongoDatabase)
            : base(mongoDatabase)
        { }

        public IEnumerable<SkillSmart.Dto.SkillMap> GetSkillsByCategoryId(string id)
        {
            var skillMapCollectionList = this.MongoCollection.FindAllAs<SkillMap>(); //get all jobseekers

            List<SkillSmart.Dto.SkillMap> jobSeekerCursor = new List<SkillSmart.Dto.SkillMap>();
            foreach (SkillMap SkillMapCollection in skillMapCollectionList)
            {
                if(SkillMapCollection.CategoryId.ToString() == id)
                {
                    SkillSmart.Dto.SkillMap jobSeekerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.SkillMap, SkillSmart.Dto.SkillMap>(SkillMapCollection);
                    jobSeekerCursor.Add(jobSeekerObj);
                }    
            }
            return jobSeekerCursor;
        }

        public IEnumerable<SkillSmart.Dto.SkillMap> GetAllSkillMap()
        {
            var skillMapCollectionList = this.MongoCollection.FindAllAs<SkillMap>(); //get all jobseekers

            List<SkillSmart.Dto.SkillMap> jobSeekerCursor = new List<SkillSmart.Dto.SkillMap>();
            foreach (SkillMap SkillMapCollection in skillMapCollectionList)
            {
                SkillSmart.Dto.SkillMap jobSeekerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.SkillMap, SkillSmart.Dto.SkillMap>(SkillMapCollection);
                jobSeekerCursor.Add(jobSeekerObj);
            }
            return jobSeekerCursor;
        }

        public void Create(SkillSmart.Dto.SkillMap entity)
        {
            SkillMap seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.SkillMap, SkillSmartMongoDA.Entities.SkillMap>(entity);
            base.Create(seeker);
        }

        public new SkillSmart.Dto.SkillMap GetById(string id)
        {
            SkillMap dbObj = base.GetById(id);
            SkillSmart.Dto.SkillMap seeker = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.SkillMap, SkillSmart.Dto.SkillMap>(dbObj);
            return seeker;
        }

        public void Update(SkillSmart.Dto.SkillMap entity)
        {
                
        }

        public void Delete(SkillSmart.Dto.SkillMap entity)
        {
            
        }
    }
}
