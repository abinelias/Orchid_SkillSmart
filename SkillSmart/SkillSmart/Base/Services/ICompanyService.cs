using SkillSmart.Base.Entities;
using System.Collections.Generic;
namespace SkillSmart.Base.Services
{
    public interface ICompanyService<T> : IEntityService<T> where T : IEntity
    {
        IEnumerable<T> GetAll();

    }
}
