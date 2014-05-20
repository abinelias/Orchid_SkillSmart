using SkillSmart.Base.Entities;
using System.Collections.Generic;
namespace SkillSmart.Base.Services
{
    public interface ISkillReferenceService<T> : IEntityService<T> where T : IEntity
    {
        IEnumerable<T> GetAllReference(string jobseekerId);
    }
}
