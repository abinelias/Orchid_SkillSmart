using MongoDB.Driver;
using MongoDB.Driver.Builders;
using SkillSmart.Base.Services;
using SkillSmart.Utilities;
using System;
using System.Collections.Generic;
namespace SkillSmartMongoDA.Services
{
    using Entities;
    public class AdditionalInformationService : EntityService<AdditionalInformation>, IAdditionalInformationService<SkillSmart.Dto.AdditionalInformation>
    {
        public AdditionalInformationService(MongoDatabase mongoDatabase)
            : base(mongoDatabase)
        { }
 
        /// <summary>
        /// Function to createjobseekers additional information
        /// </summary>
        /// <param name="entity">Additional information object</param>
        public void Create(SkillSmart.Dto.AdditionalInformation entity)
        {
            AdditionalInformation seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.AdditionalInformation, SkillSmartMongoDA.Entities.AdditionalInformation>(entity);
            base.Create(seeker);
            entity.Id = seeker.Id;
        }

        /// <summary>
        /// Function to get jobseeker additional information by id
        /// </summary>
        /// <param name="id">jobseeker id</param>
        /// <returns>jobseeker additional informaton object</returns>
        public new SkillSmart.Dto.AdditionalInformation GetById(string id)
        {
            var entityQuery = Query<SkillSmartMongoDA.Entities.AdditionalInformation>.EQ(e => e.JobSeekerId, id);
            AdditionalInformation dbObj = MongoCollection.FindOne(entityQuery);

            SkillSmart.Dto.AdditionalInformation seeker = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.AdditionalInformation, SkillSmart.Dto.AdditionalInformation>(dbObj);
            return seeker;
        }

        /// <summary>
        /// Function to update jobseeker additional information
        /// </summary>
        /// <param name="entity">jobseeker additional informaton object</param>
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
