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

        public void Create(SkillSmart.Dto.Overview entity)
        {
            Overview seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.Overview, SkillSmartMongoDA.Entities.Overview>(entity);
            base.Create(seeker);
        }

        public new SkillSmart.Dto.Overview GetById(string id)
        {
            Overview dbObj = base.GetById(id);
            SkillSmart.Dto.Overview seeker = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.Overview, SkillSmart.Dto.Overview>(dbObj);
            return seeker;
        }

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
