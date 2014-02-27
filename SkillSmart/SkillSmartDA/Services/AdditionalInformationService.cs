using MongoDB.Driver;
using MongoDB.Driver.Builders;
using SkillSmart.Base.Services;
using SkillSmart.Utilities;
using System.Collections.Generic;
namespace SkillSmartMongoDA.Services
{
    using Entities;
    public class AdditionalInformationService : EntityService<AdditionalInformation>, IAdditionalInformationService<SkillSmart.Dto.AdditionalInformation>
    {
        public AdditionalInformationService(MongoDatabase mongoDatabase)
            : base(mongoDatabase)
        { }
 
        public void Create(SkillSmart.Dto.AdditionalInformation entity)
        {
            AdditionalInformation seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.AdditionalInformation, SkillSmartMongoDA.Entities.AdditionalInformation>(entity);
            base.Create(seeker);
        }

        public new SkillSmart.Dto.AdditionalInformation GetById(string id)
        {
            AdditionalInformation dbObj = base.GetById(id);
            SkillSmart.Dto.AdditionalInformation seeker = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.AdditionalInformation, SkillSmart.Dto.AdditionalInformation>(dbObj);
            return seeker;
        }

        public void Update(SkillSmart.Dto.AdditionalInformation entity)
        {
            AdditionalInformation seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.AdditionalInformation, SkillSmartMongoDA.Entities.AdditionalInformation>(entity);
            base.Update(seeker);         
        }

        public void Delete(SkillSmart.Dto.AdditionalInformation entity)
        { 
        }

    }
}
