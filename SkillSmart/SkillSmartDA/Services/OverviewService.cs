using MongoDB.Driver;
using MongoDB.Driver.Builders;
using SkillSmart.Base.Services;
using SkillSmart.Utilities;
using System.Collections.Generic;
namespace SkillSmartMongoDA.Services
{
    using Entities;
    public class OverviewService : EntityService<Overview>, IOverviewService<SkillSmart.Dto.Overview>
    {
        public OverviewService(MongoDatabase mongoDatabase)
            : base(mongoDatabase)
        { }

        /// <summary>
        /// Function to create jobseeker overview
        /// </summary>
        /// <param name="entity">jobseeker overview object</param>
        public void Create(SkillSmart.Dto.Overview entity)
        {
            Overview seekerOverview = MapperUtilities.MapToDomainModel<SkillSmart.Dto.Overview, SkillSmartMongoDA.Entities.Overview>(entity);
            base.Create(seekerOverview);
        }

        /// <summary>
        /// to get job geeker overview using jobseekerid
        /// </summary>
        /// <param name="id">JobseekerId</param>
        /// <returns>Jobseeker overview object</returns>
        public new SkillSmart.Dto.Overview GetById(string id)
        {
            var entityQuery = Query<SkillSmartMongoDA.Entities.Overview>.EQ(e => e.JobSeekerId, id);
            Overview dbObj = MongoCollection.FindOne(entityQuery);

            SkillSmart.Dto.Overview seekerOverview = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.Overview, SkillSmart.Dto.Overview>(dbObj);
            return seekerOverview;
        }

        /// <summary>
        /// Function to update jobseeker
        /// </summary>
        /// <param name="entity">jobseeker overview object</param>
        public void Update(SkillSmart.Dto.Overview entity)
        {
            Overview seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.Overview, SkillSmartMongoDA.Entities.Overview>(entity);
            base.Update(seeker);         
        }

        public void Delete(SkillSmart.Dto.Overview entity)
        {
            
        }
    }
}
