using SkillSmart.Base.Entities;
using System.Collections.Generic;
namespace SkillSmart.Base.Services
{
    public interface IJobPermissionService<T> : IEntityService<T> where T : IEntity
    {
        IEnumerable<T> GetAllJobsPermission(string jobSeekerId);
    }
}
