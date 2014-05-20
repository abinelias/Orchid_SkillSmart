using MongoDB.Driver;
using MongoDB.Driver.Builders;
using SkillSmart.Base.Services;
using SkillSmart.Utilities;
using System.Collections.Generic;
using MongoDB.Driver.Linq;
namespace SkillSmartMongoDA.Services
{
    using Entities;
    public class EducationService : EntityService<Education>, IEducationService<SkillSmart.Dto.Education>
    {
        public EducationService(MongoDatabase mongoDatabase)
            : base(mongoDatabase)
        { }

        public IEnumerable<SkillSmart.Dto.Education> GetAllEducationById(string id)
        {
            var jobSeekerEducationList = this.MongoCollection.FindAllAs<Education>();

            List<SkillSmart.Dto.Education> jobSeekerEducation = new List<SkillSmart.Dto.Education>();
            foreach (Education jobSeeker in jobSeekerEducationList)
            {
                if (jobSeeker.JobSeekerId == id)
                {
                    SkillSmart.Dto.Education jobSeekerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.Education, SkillSmart.Dto.Education>(jobSeeker);
                    jobSeekerEducation.Add(jobSeekerObj);
                }
            }
            return jobSeekerEducation;
        }

        public void Create(SkillSmart.Dto.Education entity)
        {
            Education seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.Education, SkillSmartMongoDA.Entities.Education>(entity);
            base.Create(seeker);
            entity.Id = seeker.Id;
        }

        public new SkillSmart.Dto.Education GetById(string id)
        {
            Education dbObj = base.GetById(id);
            SkillSmart.Dto.Education seeker = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.Education, SkillSmart.Dto.Education>(dbObj);
            return seeker;
        }

        public void Update(SkillSmart.Dto.Education entity)
        {
            Education seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.Education, SkillSmartMongoDA.Entities.Education>(entity);
            base.Update(seeker);         
        }

        public void Delete(SkillSmart.Dto.Education entity)
        {
            Education seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.Education, SkillSmartMongoDA.Entities.Education>(entity);
            base.Delete(seeker);
        }
    }
}
