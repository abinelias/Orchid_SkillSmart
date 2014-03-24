using MongoDB.Driver;
using MongoDB.Driver.Builders;
using SkillSmart.Base.Services;
using SkillSmart.Utilities;
using System.Collections.Generic;
using MongoDB.Driver.Linq;
namespace SkillSmartMongoDA.Services
{
    using Entities;
    public class SkillAliasService : EntityService<SkillAlias>, ISkillAliasService<SkillSmart.Dto.SkillAlias>
    {
        public SkillAliasService(MongoDatabase mongoDatabase)
            : base(mongoDatabase)
        { }

        /// <summary>
        /// Function to Get all skill alias of the skill
        /// </summary>
        /// <param name="id">SkillId</param>
        /// <returns>List of skill alias of a skill</returns>
        public IEnumerable<SkillSmart.Dto.SkillAlias> GetAllSkillAliasById(string id)
        {
            var skillAliasList = this.MongoCollection.FindAllAs<SkillAlias>();

            List<SkillSmart.Dto.SkillAlias> skillAlias = new List<SkillSmart.Dto.SkillAlias>();
            foreach (SkillAlias  skill in skillAliasList)
            {
                if (skill.SkillId == id)
                {
                    SkillSmart.Dto.SkillAlias skillAliasObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.SkillAlias, SkillSmart.Dto.SkillAlias>(skill);
                    skillAlias.Add(skillAliasObj);
                }
            }
            return skillAlias;
        }

        /// <summary>
        /// Function to Create new skill alias for a skill
        /// </summary>
        /// <param name="entity">Skill Alias Object</param>
        public void Create(SkillSmart.Dto.SkillAlias entity)
        {
            SkillAlias seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.SkillAlias, SkillSmartMongoDA.Entities.SkillAlias>(entity);
            base.Create(seeker);
        }

        /// <summary>
        /// Function to get details of a skill alias
        /// </summary>
        /// <param name="id">SkillAliasId</param>
        /// <returns>Skill Alias Object</returns>
        public new SkillSmart.Dto.SkillAlias GetById(string id)
        {
            SkillAlias dbObj = base.GetById(id);
            SkillSmart.Dto.SkillAlias seeker = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.SkillAlias, SkillSmart.Dto.SkillAlias>(dbObj);
            return seeker;
        }

        /// <summary>
        /// Function to Update skill alias details
        /// </summary>
        /// <param name="entity">Skill Alias Object</param>
        public void Update(SkillSmart.Dto.SkillAlias entity)
        {
            SkillAlias seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.SkillAlias, SkillSmartMongoDA.Entities.SkillAlias>(entity);
            base.Update(seeker);         
        }

        public void Delete(SkillSmart.Dto.SkillAlias entity)
        {
            
        }
    }
}
