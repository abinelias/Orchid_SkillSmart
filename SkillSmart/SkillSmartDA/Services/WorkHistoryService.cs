using MongoDB.Driver;
using MongoDB.Driver.Builders;
using SkillSmart.Base.Services;
using SkillSmart.Utilities;
using System.Collections.Generic;
using MongoDB.Driver.Linq;
namespace SkillSmartMongoDA.Services
{
    using Entities;
    public class WorkHistoryService : EntityService<WorkHistory>, IWorkHistoryService<SkillSmart.Dto.WorkHistory>
    {
        public WorkHistoryService(MongoDatabase mongoDatabase)
            : base(mongoDatabase)
        { }

        public IEnumerable<SkillSmart.Dto.WorkHistory> GetJobSeekerWorkHistory(string id)
        {
            var jobSeekerWorkHistoryList = this.MongoCollection.FindAllAs<WorkHistory>();

            List<SkillSmart.Dto.WorkHistory> jobSeekerWorkHostory = new List<SkillSmart.Dto.WorkHistory>();
            foreach (WorkHistory jobSeeker in jobSeekerWorkHistoryList)
            {
                if (jobSeeker.JobSeekerId == id)
                {
                    SkillSmart.Dto.WorkHistory jobSeekerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.WorkHistory, SkillSmart.Dto.WorkHistory>(jobSeeker);
                    jobSeekerWorkHostory.Add(jobSeekerObj);
                }
            }
            return jobSeekerWorkHostory;
        }

        public void Create(SkillSmart.Dto.WorkHistory entity)
        {
            WorkHistory seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.WorkHistory, SkillSmartMongoDA.Entities.WorkHistory>(entity);
            base.Create(seeker);
        }

        public new SkillSmart.Dto.WorkHistory GetById(string id)
        {
            WorkHistory dbObj = base.GetById(id);
            SkillSmart.Dto.WorkHistory seeker = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.WorkHistory, SkillSmart.Dto.WorkHistory>(dbObj);
            return seeker;
        }

        public void Update(SkillSmart.Dto.WorkHistory entity)
        {
            WorkHistory seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.WorkHistory, SkillSmartMongoDA.Entities.WorkHistory>(entity);
            base.Update(seeker);         
        }

        public void Delete(SkillSmart.Dto.WorkHistory entity)
        {
            WorkHistory seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.WorkHistory, SkillSmartMongoDA.Entities.WorkHistory>(entity);
            base.Delete(seeker);
        }
    }
}
