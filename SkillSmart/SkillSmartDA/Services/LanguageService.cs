using MongoDB.Driver;
using MongoDB.Driver.Builders;
using SkillSmart.Base.Services;
using SkillSmart.Utilities;
using System.Collections.Generic;
using MongoDB.Driver.Linq;
namespace SkillSmartMongoDA.Services
{
    using Entities;
    public class LanguageService : EntityService<Language>, ILanguageService<SkillSmart.Dto.Language>
    {
        public LanguageService(MongoDatabase mongoDatabase)
            : base(mongoDatabase)
        { }

        public IEnumerable<SkillSmart.Dto.Language> GetAllLanguagesById(string id)
        {
            var jobSeekerLanguageList = this.MongoCollection.FindAllAs<Language>();

            List<SkillSmart.Dto.Language> jobSeekerLanguage = new List<SkillSmart.Dto.Language>();
            foreach (Language jobSeeker in jobSeekerLanguageList)
            {
                if (jobSeeker.JobSeekerId == id)
                {
                    SkillSmart.Dto.Language jobSeekerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.Language, SkillSmart.Dto.Language>(jobSeeker);
                    jobSeekerLanguage.Add(jobSeekerObj);
                }
            }
            return jobSeekerLanguage;
        }

        public void Create(SkillSmart.Dto.Language entity)
        {
            Language seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.Language, SkillSmartMongoDA.Entities.Language>(entity);
            base.Create(seeker);
        }

        public new SkillSmart.Dto.Language GetById(string id)
        {
            Language dbObj = base.GetById(id);
            SkillSmart.Dto.Language seeker = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.Language, SkillSmart.Dto.Language>(dbObj);
            return seeker;
        }

        public void Update(SkillSmart.Dto.Language entity)
        {
            Language seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.Language, SkillSmartMongoDA.Entities.Language>(entity);
            base.Update(seeker);         
        }

        public void Delete(SkillSmart.Dto.Language entity)
        {
            Language seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.Language, SkillSmartMongoDA.Entities.Language>(entity);
            base.Delete(seeker);
        }
    }
}
