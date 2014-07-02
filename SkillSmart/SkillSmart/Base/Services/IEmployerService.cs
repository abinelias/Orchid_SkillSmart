using SkillSmart.Base.Entities;
using System.Collections.Generic;
namespace SkillSmart.Base.Services
{
    public interface IEmployerService<T> : IEntityService<T> where T : IEntity
    {

        IEnumerable<T> GetAll(string companyId);

    }
}

