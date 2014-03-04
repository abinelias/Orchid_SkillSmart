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

        /// <summary>
        /// Function to get all languages of jobseeker
        /// </summary>
        /// <param name="id">jobseekerID</param>
        /// <returns>List of jobseeker languages</returns>
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

        /// <summary>
        /// Function to create a new language for jobseeker
        /// </summary>
        /// <param name="entity">languagae object</param>
        public void Create(SkillSmart.Dto.Language entity)
        {
            Language seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.Language, SkillSmartMongoDA.Entities.Language>(entity);
            base.Create(seeker);
        }

        /// <summary>
        /// Function to get details of a language known by jobseeker
        /// </summary>
        /// <param name="id">languageid</param>
        /// <returns>details of language as object</returns>
        public new SkillSmart.Dto.Language GetById(string id)
        {
            Language dbObj = base.GetById(id);
            SkillSmart.Dto.Language seeker = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.Language, SkillSmart.Dto.Language>(dbObj);
            return seeker;
        }

        /// <summary>
        /// Functon to update language details of jobseeker
        /// </summary>
        /// <param name="entity">language object</param>
        public void Update(SkillSmart.Dto.Language entity)
        {
            Language seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.Language, SkillSmartMongoDA.Entities.Language>(entity);
            base.Update(seeker);         
        }

        /// <summary>
        /// Function to delete a language of jobseeker
        /// </summary>
        /// <param name="entity">language object</param>
        public void Delete(SkillSmart.Dto.Language entity)
        {
            Language seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.Language, SkillSmartMongoDA.Entities.Language>(entity);
            base.Delete(seeker);
        }
    }
}
