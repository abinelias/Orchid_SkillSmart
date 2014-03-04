using MongoDB.Driver;
using MongoDB.Driver.Builders;
using SkillSmart.Base.Services;
using SkillSmart.Utilities;
using System.Collections.Generic;
using MongoDB.Driver.Linq;
namespace SkillSmartMongoDA.Services
{
    using Entities;
    public class SkillService : EntityService<Skill>, ISkillService<SkillSmart.Dto.Skill>
    {
        public SkillService(MongoDatabase mongoDatabase)
            : base(mongoDatabase)
        { }

        /// <summary>
        /// Function to create a skill
        /// </summary>
        /// <param name="entity">SkillObject</param>
        public void Create(SkillSmart.Dto.Skill entity)
        {
            Skill seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.Skill, SkillSmartMongoDA.Entities.Skill>(entity);
            base.Create(seeker);
        }

        /// <summary>
        /// Function to get a skill details by ID
        /// </summary>
        /// <param name="id">SkillID</param>
        /// <returns>SkillObject</returns>
        public new SkillSmart.Dto.Skill GetById(string id)
        {
            Skill dbObj = base.GetById(id);
            SkillSmart.Dto.Skill seeker = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.Skill, SkillSmart.Dto.Skill>(dbObj);
            return seeker;
        }

        /// <summary>
        /// Function to Update a skill
        /// </summary>
        /// <param name="entity">SkillObject</param>
        public void Update(SkillSmart.Dto.Skill entity)
        {
            Skill seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.Skill, SkillSmartMongoDA.Entities.Skill>(entity);
            base.Update(seeker);         
        }

        public void Delete(SkillSmart.Dto.Skill entity)
        {
           
        }
    }
}
